export const home = async (req, res) => {
  const { title, content } = req.query;
  console.log(req.app.get("views"), "views");

  return res.render("Home", { title, content });
};

export const changeHome = async (req, res) => {
  const { title, content } = req.body;

  console.log(title);
  console.log(content);

  res.redirect(`/?title=${title}&content=${content}`);
};
