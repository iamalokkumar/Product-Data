require("dotenv").config()
const express=require("express");
const cors=require("cors");
const DataBase=require("mongoose");
const {URL_PORT,MONGODB_URL} = require("./BasePort/base.port");
const productRouter = require("./InitiateProduct/product.initiate");
const productPerform = require("./InitiateProduct/intiate.perform");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/product",productRouter);
app.use("/performance",productPerform);

app.listen(URL_PORT,()=>{
    DataBase.connect(MONGODB_URL);
    console.log(`server started at ${URL_PORT}`)
})

