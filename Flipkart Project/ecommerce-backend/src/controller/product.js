const { default: slugify } = require('slugify');
const Product = require('../models/product');
const shortid = require('shortid');

exports.createProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body })
    const {
        name, price, description, category, createBy, quantity
    } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        quantity,
        price,
        description, 
        productPictures,
        category,
        createBy: req.user._id
    });

    product.save()
        .then(error => {
            return res.status(400).json({error});
        })
        .then(product => {
            return res.status(201).json({ product });
        });

    // product.save(exec((error, product) => {
    //     if(error) return res.status(400).json({error});
    //     if (product){
    //         res.status(201).json({ product });
    //     }
    // }));
};