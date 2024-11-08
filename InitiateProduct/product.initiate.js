
const express=require("express");
const ProductScheemaData = require("../UserScheema/user.scheema");
const productRouter=express.Router();
productRouter.get("/",async(req,res)=>{
    try{
      const allData= await ProductScheemaData.find();
      if(allData?.length>0){
        res.status(200).json({message:"Success",data:allData})
      }
      else{
        res.status(200).json({message:"Currently not found any data",data:[]})
      }
    }
    catch(err){
        res.status(500).json({message:"There is an error with our database please try again",data:[]})
    }
})

productRouter.post("/add-product",async(req,res)=>{
    try{
const body = new ProductScheemaData(req.body);
 await body.save();
  res.status(201).json({message:"success",data:req.body})
    }
    catch(err){
  res.status(500).json({message:err.message,data:{}})
    }
})

productRouter.put("/modify", async (req, res) => {
    try {
      const body = req.body;
  
      // Check if ID or Price is provided
      if (!body.id || !body.Price) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
      }
  
      // Find the product by ID
      const product = await ProductScheemaData.findById(body.id);
      
      if (!product) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
  
      // Update the Price field
      const updatedProduct = await ProductScheemaData.findByIdAndUpdate(
        body.id,
        { $set: { Price: Number(body.Price) } },
        { new: true }
      );
  
      // Check if the update was successful
      if (updatedProduct) {
        res.status(200).json({ message: "Success", data: updatedProduct });
      } else {
        res.status(500).json({ success: false, message: "There was an error updating the product" });
      }
    } catch (err) {
      // Handle errors during the process
      res.status(500).json({ success: false, message: err.message });
    }
  });
  productRouter.delete("/:id",async(req,res)=>{
   try{
  const id=req.params.id;
  if(!id){
    return res.status(404).json({ success: false, message: "Please fill all the fields" });
  }
  const product = await ProductScheemaData.findById(id?.toString());
 if(product){
    const deleteData= await ProductScheemaData.findByIdAndDelete(product?._id);
    if(deleteData){
        res.status(201).json({ message: "Success", data: deleteData });
    }
 }
 else{
    return res.status(404).json({ success: false, message: "data not found" });
 }
   }
   catch(err){
    res.status(500).json({message:err.message,status:false})
   }
  })
module.exports=productRouter