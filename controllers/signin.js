const handleSignin = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json(400, "incorrect form submission");
  }

  db.select("email", "hash")
    .from("login")
    .where({ email: email })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where({ email: email })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.json(400, "unable to get user"));
      } else {
        res.json(400, "wrong credencials");
      }
    })
    .catch((err) => res.json(400, "wrong credencials"));
};

module.exports = {
  handleSignin: handleSignin,
};
