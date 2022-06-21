const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cultureRoute = require("./routes/culture");
const provinceRoute = require("./routes/province");

var cors = require('cors');
app.use(cors());

dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
});

app.use(express.json());
//rest api
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/cultures", cultureRoute);
app.use("/api/provinces", provinceRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running!");
});