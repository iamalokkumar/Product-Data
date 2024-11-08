const mongosh=require("mongoose");

const productPerform=new mongosh.Schema({
    isAvailable:{type:String,required:true,enum:["Available","Not Available"]},
    couponcode:{type:String,default:""},
})

const performData= mongosh.model("product-perform",productPerform,"product-perform");
module.exports=performData;