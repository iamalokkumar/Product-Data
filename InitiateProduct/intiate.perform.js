
const express=require("express");
const productPerform=express.Router();
const performData = require("../UserScheema/product.porformance");
const ProductScheemaData = require("../UserScheema/user.scheema");

productPerform.get("/",async(req,res)=>{
    try{
        const allData= await performData.find();
        if(allData?.length>0){
          res.status(200).json({message:"success",data:allData})
        
        }
        else{
            res.status(200).json({message:"success",data:[]})
        }
      }
      catch(err){
          res.status(500).json({message:"There is an error with our database please try again",data:[]})
      }
});
productPerform.post("/update",async(req,res)=>{
 try{
  const body=req.body;
  await performData.create(req.body);
  res.status(201).json({message:"success",data:body})
 }
 catch(err){
    res.status(500).json({message:"There is an error with our database please try again",data:[]})
 }
})

productPerform.post("/offer", async (req, res) => {
    try {
      const productid = req.body.id;
      const offerId = req.body.offerId;

      if (!productid || !offerId) {
        return res.status(400).json({ message: "Please fill all the information", status: "failure" });
      }
  
      const allData = await ProductScheemaData.find();
      const offerData = await performData.find();

      const matchedProduct = allData.find(data => data._id.toString() === productid);
      const matchedOffer = offerData.find(data => data._id.toString() === offerId);
  
      if (matchedProduct && matchedOffer) {
        matchedProduct.About_product.push(matchedOffer._id);
        await matchedProduct.save();
  
        res.status(200).json(matchedProduct);
      } else {
        res.status(404).json({ message: "Product or Offer not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports=productPerform