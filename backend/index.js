const express = require("express");
const cors = require("cors");
const connect  = require("./common/connection");
const router = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true, // Include credentials in CORS requests
}));
app.use(cookieParser());

app.use("/api",router);


connect();

const port=2000;

app.listen(port, ()=>{
    console.log("server ren on:",port);
})