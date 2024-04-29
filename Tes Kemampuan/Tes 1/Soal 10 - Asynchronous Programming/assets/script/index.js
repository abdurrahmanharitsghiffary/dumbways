const pokemonDetailModal = document.getElementById("pokemonDetail");

pokemonDetailModal.addEventListener("show.bs.modal", (event) => {
  const data = {};
  const modalTitle = document.getElementById("pokemonDetailLabel");
  const modalBody = document.getElementById("pokemonDetailBody");

  Object.entries(event.relatedTarget.dataset).forEach(([key, value]) => {
    console.log(key, value);
    if (value === "modal" || value === "#pokemonDetail") return;
    data[key] = JSON.parse(value);
  });

  modalTitle.innerHTML = data.id + ". " + toUpperFirstWord(data.name);

  modalBody.innerHTML = ModalBody({
    thumbnail: data.sprites?.front_default,
    abilities: data.abilities,
    stats: data.stats,
    types: data.types,
  });

  console.log(data);
});

const fetchData = async (url) => {
  const request = await fetch(url, { method: "GET" });

  const json = await request.json();

  return json;
};

const filterPokemons = (pokemons, pokemonName = "") => {
  if ((pokemons?.results ?? []).length < 1) return;

  console.log(pokemons);
  const filteredPokemons = pokemons.results.filter((pokemon) => {
    return pokemon.name.includes(pokemonName?.toLowerCase());
  });

  console.log(filteredPokemons);
  return filteredPokemons;
};

const renderPokemons = async (pokemons, limit = 10) => {
  const ul = document.getElementById("pokemon-lists");
  ul.innerHTML = "";

  ul.innerHTML = `<div class="spinner-border mt-4 text-primary">
  <span class="visually-hidden">Loading...</span>
</div>`;

  const pokemonList = await Promise.all(
    pokemons.slice(0, limit).map(async (pokemon) => {
      const completedPokemonData = await fetchData(pokemon.url);

      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-primary", "mt-auto");
      btn.setAttribute("type", "button");
      btn.setAttribute("data-bs-toggle", "modal");
      btn.setAttribute("data-bs-target", "#pokemonDetail");
      btn.innerHTML = "Details";

      Object.entries(completedPokemonData).forEach(([key, value]) => {
        if (
          ["id", "name", "sprites", "abilities", "stats", "types"].some(
            (k) => k === key
          )
        )
          btn.setAttribute(`data-${key}`, JSON.stringify(value));
      });

      console.log(btn);

      return PokemonItem({
        btn,
        id: completedPokemonData.id,
        name: completedPokemonData.name,
        sprites: completedPokemonData?.sprites?.front_default,
        types: completedPokemonData.types,
      });
    })
  );

  if (pokemonList.length === 0)
    return (ul.innerHTML = `<p class="fw-bold">No pokemon found.</p>`);
  console.log(pokemonList);

  ul.innerHTML = pokemonList.join("");
};

const toUpperFirstWord = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

(async () => {
  const searchForm = document.getElementById("search-form");
  const input = document.getElementById("search");
  const pokemons = await fetchData(
    "https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0"
  );

  console.log(pokemons);

  const filteredPokemons = filterPokemons(pokemons, "");
  await renderPokemons(filteredPokemons);

  input.addEventListener("input", async (e) => {
    e.preventDefault();

    const filteredPokemons = filterPokemons(pokemons, e.target.value ?? "");
    console.log(filteredPokemons);
    await renderPokemons(filteredPokemons);
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();

const PokemonItem = ({
  sprites,
  types,
  id,
  name,
  btn,
}) => `<li class="mw-100 h-100 d-flex flex-column align-items-center fw-bold gap-2">
<div class="card h-100" style="width: 15rem;">
  <img src="${sprites}" class="card-img-top" alt="${name}">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${id}. ${toUpperFirstWord(name)}</h5>
    <ul class="d-flex gap-2 justify-content-start py-3">
     ${types
       .map(
         (type) =>
           `<li class="type-icon type-${type.type.name}">${type.type.name}</li>`
       )
       .join("")}
    </ul>
    ${btn.outerHTML}
  </div>
</div>
</li>`;

const ModalBody = ({ thumbnail, types, abilities, stats }) => `
<img
  src="${thumbnail ?? ""}"
  class="rounded"
  width="170px"
  height="170px"
  alt="img"
          />
<div class="d-flex gap-2 fw-bold">
<p>Type:</p>  
<ul class="d-flex gap-2 justify-content-start p-0">
${types
  .map(
    (type) =>
      `<li class="type-icon type-${type.type.name}">${type.type.name}</li>`
  )
  .join("")}
</ul>
</div>

<div class="d-flex gap-2 fw-bold">
<p>Abilities:</p>  
<ul class="d-flex gap-2 justify-content-start p-0 fw-normal">
${abilities.map((ability) => `<li>${ability.ability.name}</li>`).join(",")}
</ul>
</div>
<div>
<p class="fw-bold text-md">Base stats</p>
<ul class="d-flex flex-column gap-2 p-0">
  ${stats
    .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
    .join("")}
</ul>
</div>
`;
