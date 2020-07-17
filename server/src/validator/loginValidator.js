export default function loginValidator(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(404).send({ message: 'Empty value' });
  }

  next();
}
