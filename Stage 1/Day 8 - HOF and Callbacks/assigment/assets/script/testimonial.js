const testimonials = [];

class Testimonial {
  constructor(author, image, content, rating) {
    if (this.constructor === Testimonial) {
      throw new Error("Cannot instantiated an abstract class of Testimonial.");
    }

    if ([author, image, content, rating].some((v) => !v)) {
      throw new Error("All instance params must be defined!");
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      throw new Error("Rating must be a number or float between 1 and 5");
    }

    if (!this.getTestimonialElement) {
      throw new Error("getTestimonialElement must be implemented.");
    }

    this.author = author;
    this.image = image;
    this.createdAt = Date.now();
    this.content = content;
    this.rating = rating;
  }
}

const TestimonialCard = ({ author, src, rating, content, type, createdAt }) => {
  const ratingStar = [1, 2, 3, 4, 5]
    .map((val) => {
      const difference = rating - val + 1;
      const isShowFullStar = difference >= 1;
      const isShowHalfStar = difference >= 0.5;

      if (isShowFullStar) return '<i class="fa-solid fa-star"></i>';
      if (isShowHalfStar) return '<i class="fa-solid fa-star-half-stroke"></i>';
      return '<i class="fa-regular fa-star"></i>';
    })
    .join("");

  return `<div class="testimonial">
<img
  src="${src}"
  alt="${author}"
  class="testimonial-image"
/>
<p class="testimonial-content">${content}</p>
<div class="testimonial-rating">
${ratingStar}
<span> ${rating}/5 </span>
</div>
<p class="testimonial-created-date">${getTestimonialDuration(createdAt)}</p>
<div class="testimonial-author">
  <span>${type === "company" ? "Company " : ""}${author}</span>
  <img src="${src}" class="testimonial-avatar"></img>
</div>
</div>`;
};

class CompanyTestimonial extends Testimonial {
  getTestimonialElement() {
    return TestimonialCard({
      author: this.author,
      content: this.content,
      rating: this.rating,
      src: this.image,
      type: "company",
      createdAt: this.createdAt,
    });
  }
}

class PersonalTestimonial extends Testimonial {
  getTestimonialElement() {
    return TestimonialCard({
      author: this.author,
      content: this.content,
      rating: this.rating,
      src: this.image,
      type: "personal",
      createdAt: this.createdAt,
    });
  }
}

const imageSrc =
  "https://images.unsplash.com/photo-1713128596799-9c74cfe629e0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

testimonials.unshift(
  new PersonalTestimonial("John Doe", imageSrc, "Mantap", 1.4),
  new PersonalTestimonial("John Doe", imageSrc, "Mantap", 1.6),
  new PersonalTestimonial("John Doe", imageSrc, "Mantap", 2.7),
  new PersonalTestimonial("John Doe", imageSrc, "Mantap", 4.4),
  new PersonalTestimonial("John Doe", imageSrc, "Mantap", 4.6)
);

const getTestimonialDuration = (date) => {
  const d = new Date(date);

  if (Date.now() < d.getTime()) return "0 second ago.";

  const diffNow = Date.now() - d.getTime();

  const day = diffNow / (1000 * 60 * 60 * 24);
  const intD = Math.floor(day);

  console.log(day);

  const diffD = day - intD;
  const hour = diffD * 24;
  const intH = Math.floor(hour);

  console.log(hour, "Hour");

  const diffH = hour - intH;
  const minutes = diffH * 60;
  const intM = Math.floor(minutes);

  const diffM = minutes - intM;
  const second = diffM * 60;
  const intS = Math.floor(second);

  let isAlreadyFormated = false;
  let durr = "";

  const result = { day: intD, hour: intH, minute: intM, second: intS };

  console.log(result);

  console.log(diffNow);

  if (diffNow >= 0 && diffNow < 1000) return "0 second ago.";

  if (intD > 7) {
    return d.toDateString();
  }

  Object.entries(result).forEach(([key, value]) => {
    if (value > 0 && !isAlreadyFormated) {
      isAlreadyFormated = true;
      durr = `${value} ${key}${value > 1 ? "s" : ""} ago.`;
    }
  });

  return durr;
};

const renderTestimonials = (rating) => {
  const testimonialLists = document.getElementById("testimonial-lists");
  testimonialLists.innerHTML = "";

  const filteredTestimonial = testimonials.filter((testimonial) => {
    if (!rating) return true;
    return Math.floor(testimonial.rating) === rating;
  });

  if (filteredTestimonial.length === 0) {
    return (testimonialLists.innerHTML = `<p class="fw-bold">Data not found.</p>`);
  }

  console.log(filteredTestimonial);

  if (testimonials.length > 0) {
    testimonialLists.innerHTML = filteredTestimonial
      .map((testimonial) => testimonial.getTestimonialElement())
      .join("");
  }
};

renderTestimonials();

// TESTIMONIAL RATING

const ratingFilter = document.querySelector(".rating-filter");

ratingFilter.querySelectorAll("button[data-rating]").forEach((filterButton) => {
  const rating = filterButton.dataset.rating;

  const onClick = (e) => {
    if (rating === "all") {
      return renderTestimonials(false);
    }
    return renderTestimonials(Number(rating));
  };

  filterButton.addEventListener("click", onClick);
});
