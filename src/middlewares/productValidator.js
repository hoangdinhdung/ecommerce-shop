//----------* REQUIRE'S *----------//
const path = require('path');
const {check,validationResult,body} = require('express-validator');
const { Product } = require('../db/models');


//----------* MIDDLEWARE *----------//
module.exports = {
    store: [
        body('name')
            .notEmpty()
                .withMessage('Bạn phải nhập tên của models')
                .bail(),
        body('category')
            .notEmpty()
                .withMessage('Bạn phải chọn một danh mục')
                .bail(),
        body('type')
            .notEmpty()
                .withMessage('Bạn phải chọn một loại mặt hàng')
                .bail(),
        body('size')
            .notEmpty()
                .withMessage('Bạn phải chọn một kích thước')
                .bail(),
        body('color')
            .notEmpty()
                .withMessage('Bạn phải chọn một màu')
                .bail(),
        body('description')
            .notEmpty()
                .withMessage('Bạn phải nhập mô tả')
                .bail()
            .isLength({min:20})
                .withMessage('Bạn phải nhập thêm thông tin về mặt hàng này')
                .bail(),
        body('image')
            .custom(function(value, { req }){    
                return req.files[0];
            })
                .withMessage('Bạn phải nhập một hình ảnh')
                .bail()
            .custom(function(value, { req }){    
                const ext = path.extname(req.files[0].originalname);
                const extValidas = [".jpg", ".jpeg", ".png", ".gif"];
                return extValidas.includes(ext.toLowerCase());
            })
            .withMessage('Hình ảnh phải có định dạng hợp lệ')
            .bail(),
        body('stock')
            .notEmpty()
                .withMessage('Mặt hàng không có hàng')
                .bail(),
        body('discount')
            .notEmpty()
                .withMessage('Bạn phải chọn phần trăm chiết khấu')
                .bail(),
        body('price')
            .notEmpty()
                .withMessage('Bạn phải nhập giá')
                .bail()  
    ],

    edit: [
        body('name')
            .notEmpty()
                .withMessage('Bạn phải nhập tên kiểu máy')
                .bail(),
        body('category')
            .notEmpty()
                .withMessage('Bạn phải chọn một danh mục')
                .bail(),
        body('type')
            .notEmpty()
                .withMessage('Bạn phải chọn một loại mặt hàng')
                .bail(),
        body('size')
            .notEmpty()
                .withMessage('Bạn phải chọn một kích thước')
                .bail(),
        body('color')
            .notEmpty()
                .withMessage('Bạn phải chọn một màur')
                .bail(),
        body('description')
            .notEmpty()
                .withMessage('Bạn phải nhập mô tả')
                .bail()
            .isLength({min:20})
                .withMessage('Bạn phải nhập thêm thông tin về mặt hàng này')
                .bail(),
        body('image')
            .custom(function(value, { req }){
                if(typeof req.files[0] == "undefined"){
                    return true;
                }else if(typeof req.files[0] != "undefined"){
                    const ext = path.extname(req.files[0].originalname);
                    const extValidas = [".jpg", ".jpeg", ".png", ".gif"];
                    return extValidas.includes(ext.toLowerCase());
                }   
            }) 
            .withMessage('Hình ảnh phải có định dạng hợp lệ')
            .bail(),
        body('stock')
            .notEmpty()
                .withMessage('cMặt hàng không có hàng')
                .bail(),
        body('discount')
            .notEmpty()
                .withMessage('Bạn phải chọn phần trăm chiết khấu')
                .bail(),
        body('price')
            .notEmpty()
                .withMessage('Bạn phải nhập giá')
                .bail()  
    ]
}