const express = require("express")
const errorHandler = require("./middleware/errorHanlder")
const connectDb = require("./config/dbConnection")
const app = express()
const dotenv = require("dotenv").config()

connectDb()
app.use(express.json())
app.use(errorHandler)

const port = process.env.PORT || 5000;

app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})