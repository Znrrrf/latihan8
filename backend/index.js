const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./models");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send({
        status: true,
        message: "this is my api"
    });
});

const { userRouters, authRouters } = require("./routers");
app.use("/user", userRouters);
app.use("/auth", authRouters);


app.listen(process.env.PORT, () => {
    // db.sequelize.sync({ alter: true });
    console.log(`server is running on port: ${process.env.PORT}`);
})