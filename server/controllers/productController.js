const Product = require('../models/prodModel');
const AsyncHandler = require('express-async-handler');

const addProduct= AsyncHandler(async (req, res) => {

const {category,title,desc,condition,price,image,location,user}  = req.body

    try {

        const postProduct = await Product.create({
            category,title,desc,condition,price,image,location, user
        })
        res.send(postProduct)
    } catch (error) {
        throw new Error(error)
    }


})

const updateProduct= AsyncHandler(async (req, res) => {
 const {category,title,desc,condition,price,image,location,user,prod_id}  = req.body

    const findProduct= await Product.findOne({_id:prod_id})
    if (!findProduct) {
        res.status(400);
        throw new Error('Product not found!');
    } 
    else 
    {
       // console.log('in update product')
        findProduct.category=category;
        findProduct.title=title;
        findProduct.desc=desc;
        findProduct.condition=condition;
        findProduct.price=price
        findProduct.image=image
        findProduct.location=location
        findProduct.user=user
        findProduct.save()
       
    }
       res.send(findProduct)
    })

const deleteProduct= AsyncHandler(async (req, res) => {
        const {prod_id,user_id}  = req.body

       // console.log(prod_id)

       
        const result= await Product.deleteOne({_id:prod_id})
        //console.log(result)
           if (result.deletedCount === 1) {
              const newList=await Product.find({user:user_id})
              res.send(newList)
           } 
           else 
           {
            res.status(400);
            throw new Error('Product not found or deletion failed!');
           }
        })
              //

const getProductsCategory = AsyncHandler(async (req, res) => {
   
    const {category}=req.query
  //  console.log(category)
    const products = await Product.find({category}) 
                                        .populate('user')
                                        .exec()

    //console.log(products)
    res.send(products);
})

const getSearchProduct = AsyncHandler(async (req, res) => {
   
    const {searchStr}=req.query
    try {
        const regex = new RegExp(searchStr, 'i'); // 'i' flag for case-insensitive search

        const results = await Product.find({
            $or: [
                { title: { $regex: regex } },
                { category: { $regex: regex } },
                { location: { $regex: regex } },
            ],
        })
        .populate('user') // If you want to populate the 'user' field
        .exec();

        res.send(results);
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
    
})

const getProduct = AsyncHandler(async (req, res) => {
  
     const {_id}=req.query

     const productData = await Product.findOne({_id})
        .populate('user')
        .exec()

      //  console.log(productData.user.name)
  
    // const productData = await Product.findOne({_id}).exec();
  
     res.send(productData);
 })

 const getProducts = AsyncHandler(async (req, res) => {
   // console.log('ddd')
     const {user}=req.query
    // console.log(user)
    const productsData = await Product.find({user});
  //  console.log(productsData)
    res.send(productsData);
})
 

module.exports = {
    addProduct,
    getProductsCategory,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getSearchProduct
}