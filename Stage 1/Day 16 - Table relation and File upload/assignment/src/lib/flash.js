export const flash = ({ req, res, message, redirectTo }) => {
  const [key, flashMessage] = message;
  req.flash(key, flashMessage);
  res.redirect(redirectTo ?? "back");
};
