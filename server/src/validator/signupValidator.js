export default function signupValidator(req, res, next) {
  if (!req.body.email || !req.body.password || !req.body.nickname) {
    return res.status(404).send({ message: 'Empty value' });
  }

  next();
}
