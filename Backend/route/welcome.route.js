import express from 'express'

const welcomeRoute = express.Router()

welcomeRoute.get('/',(req, res) => {
  res.json({ message: "Welcome, authorized user!" });
})

export default welcomeRoute