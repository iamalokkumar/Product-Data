
const mongosh=require("mongoose");
const userScheema=new mongosh.Schema({
    id:{type:Number,required:true},
    Product_name:{type:String,required:true},
    Price:{type:Number,required:true, 
         min: [1, 'price must be at least 1'],
        max: [1000, 'price must be less than or equal to 1000']},
        Image:{type:String,required:true},
        About_product:[{type:mongosh.Schema.Types.ObjectId,ref:"product-perform"}]

}, {
    versionKey: false
  })

  const ProductScheemaData= mongosh.model("Collection",userScheema,"Collection");

  module.exports=ProductScheemaData;