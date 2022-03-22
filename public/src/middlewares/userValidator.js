//----------* REQUIRE'S *----------//
const path = require('path');
const bcrypt = require('bcryptjs')
const {check,validationResult,body} = require('express-validator');
const { User } = require('../db/models');


//----------* MIDDLEWARE *----------//

module.exports = {
    register: [
        body('first_name')
            .notEmpty()
                .withMessage('Bạn phải nhập tên của bạn')
                .bail()
            .isLength({min: 2})
                .withMessage('Tên đã nhập phải có ít nhất hai ký tự')
                .bail(),
        body('last_name')
        .notEmpty()
            .withMessage('Bạn phải nhập họ của mình')
            .bail()
        .isLength({min: 2})
            .withMessage('Họ đã nhập phải có ít nhất hai ký tự')
            .bail(),
        body('email')
            .notEmpty()
                .withMessage('Bạn phải nhập email')
                .bail()
            .isEmail()
                .withMessage('Bạn phải nhập một email hợp lệ')
                .bail()
            .custom(value => {
                return User.findOne({ 
                    where: 
                    { email: value }
                }).then(user => {
                    if (user) {
                    return Promise.reject('Email đã được đăng ký');
                    }
                })
            }),
        body('password')
            .isLength({min:8})
                .withMessage('Mật khẩu phải có ít nhất 8 ký tự ')
                .bail()
            .custom(function(value, { req }){
                return value == req.body.repeatpassword
            })
                .withMessage('Mật khẩu không phù hợp')
                .bail(),
        body('repeatpassword')
            .notEmpty()
                .withMessage('Bạn phải nhập lại mật khẩu của mình')
                .bail(),
        body('image')
            .custom(function(value, { req }){
                return req.files[0];
            })
                .withMessage('Bạn phải nhập một hình ảnh')
                .bail()
            .custom(function(value, { req }){
                const ext = path.extname(req.files[0].originalname);
                const extValidas = ['.jpg', '.jpeg', '.png', '.gif'];
                return extValidas.includes(ext.toLowerCase());
            })
                .withMessage('Hình ảnh phải có định dạng hợp lệ')
                .bail()
    ],
    
    edit: [
        body('first_name')
            .notEmpty()
                .withMessage('Trường tên là bắt buộc')
                .bail()
            .isLength({min: 2})
                .withMessage('Tên phải có ít nhất hai ký tự')
                .bail(),
        body('last_name')
            .notEmpty()
                .withMessage('Trường họ là bắt buộc')
                .bail()
            .isLength({min: 2})
                .withMessage('Họ phải có ít nhất hai ký tựs')
                .bail(),
        body('email')
            .notEmpty()
                .withMessage('Bạn phải nhập email')
                .bail()
            .isEmail()
                .withMessage('Email đã nhập phải hợp lệ ')
                .bail(),
        body('role')
        .custom(function(value, {req}){
            if (req.session.user.role.name == 'admin'){
                    return value != undefined
            }
        })
        .withMessage('Bạn phải chọn một vai trò')
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
        body('password')
            .notEmpty()
                .withMessage('Bạn phải nhập mật khẩu để có thể chỉnh sửa dữ liệu của mình')
                .bail()
            .isLength({min:8})
                .withMessage('Mật khẩu phải có ít nhất 8 ký tự')
                .bail()
            .custom((value , {req} )=> {
                return User.findOne({ 
                    where: 
                    { email: req.body.email }
                }).then(user => {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return Promise.reject('Mật khẩu đã nhập không chính xác');
                    }
                })
            })
            /* Revisar para que el usuario pueda cambiar el mail y no de erronea la validac de la pass
            .custom((value , {req} )=> {
                return User.findByPk(req.session.user.id).then(user => {
                    if (!bcrypt.compareSync(value, user.password)) {
                    return Promise.reject('La contraseña ingresada es incorrecta');
                    }
                })
            })*/
    ],
    
    login: [
        body('email')
            .notEmpty()
                .withMessage('Bạn phải nhập email của bạn')
                .bail()
            .isEmail()
                .withMessage('Bạn phải nhập một email hợp lệ')
                .bail()
            .custom((value , {req} )=> {
                return User.findOne({ 
                    where: 
                    { email: value }
                }).then(user => {
                    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                    return Promise.reject('Tên người dùng hoặc mật khẩu đã nhập không chính xác');
                    }
                })
            }),
        body('password')
        .notEmpty()
            .withMessage('Bạn phải nhập mật khẩu của mình')
            .bail()
    ],

    newPass: [
        body('oldPassword')
        .notEmpty()
            .withMessage('Bạn phải nhập mật khẩu hiện tại của mình')
            .bail()
        .custom((value , {req} )=> {
            return User.findOne({ 
                where: 
                { id: req.session.user.id }
            }).then(user => {
                if (!bcrypt.compareSync(value, user.password)) {
                return Promise.reject('Mật khẩu đã nhập không chính xác');
                }
            })
        }),
        body('newPassword')
            .notEmpty()
                .withMessage('Bạn phải nhập mật khẩu mới')
                .bail()
            .custom((value , {req} )=> {
                return User.findOne({ 
                    where: 
                    { id: req.session.user.id }
                }).then(user => {
                    if (bcrypt.compareSync(value, user.password)) {
                    return Promise.reject('Mật khẩu mới phải khác mật khẩu cũ');
                    }
                })
            })
            .isLength({min:8})
                .withMessage('Mật khẩu phải dài ít nhất 8 ký tự')
                .bail(),
        body('repeatNewPassword')
        .notEmpty()
            .withMessage('Bạn phải nhập lại mật khẩu mới của mình')
            .bail()
        .custom(function(value, { req }){
            return value == req.body.newPassword
        })
            .withMessage('Mật khẩu không phù hợp')
            .bail()
    ]
}