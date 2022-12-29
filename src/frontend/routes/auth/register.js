/*
https://www.youtube.com/watch?v=cvu6a3P9S0M 3:30
npm i --save node-fetch

https://www.npmjs.com/package/node-fetch
z dokumentacji
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

*/
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

// WARNING pamietać o dodaniu async przed callbackiem
router.post("/api/users/register", async (req, res) => {
  // dobicie się do Django
  const { first_name, last_name, email, password } = req.body;

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
  });

  // alterantywnie zamiast dwóch wyżej linijek
  // const body = JSON.stringify(req.body)

  try {
    // dobicie się do Django
    // http://localhost:8000/api/users/register
    // const apiRes = await fetch(`${process.env.API_URL}/api/users/register/`, {
    const apiRes = await fetch(`http://localhost:8000/api/users/register/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    });

    console.log("register express");
    const data = await apiRes.json();
    console.log("data");
    console.log(data);

    // nei sprawdzam statusy, po prostu wypycham go na zewnatrz
    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res
      .status(500)
      .json("Something went wrong when registering account");
  }
});

module.exports = router;