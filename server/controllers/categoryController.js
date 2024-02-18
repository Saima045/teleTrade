const Category = require('../models/categoryModel');
const AsyncHandler = require('express-async-handler');
const createCategory = AsyncHandler(async (req, res) => {
    const { caption, image } = req.body
    try {
        const createdCategory = await Category.create({
            caption, image
        })
        res.send(createdCategory)
    } catch (error) {
        throw new Error(error)
    }


})

const getCategories = AsyncHandler(async (req, res) => {
    try{

        const categories = await Category.find();
        res.send(categories)

    }
    catch (error) {
        throw new Error(error)
    }
  
})

const getCategory = AsyncHandler(async (req, res) => {
    const {category}=req.query
    const categorydata = await Category.findOne({_id:category});
    res.send(categorydata);
  
})

module.exports = {
    createCategory,
    getCategories,
    getCategory
}