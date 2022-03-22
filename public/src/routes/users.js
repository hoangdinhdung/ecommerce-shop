//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const usersController = require('../controllers/usersController');   //-> 
const userValidator = require('../middlewares/userValidator');       //-> Xác thực người dùng
const multer = require('../middlewares/multerUsers');                //-> Multer người dùng
const authMW = require('../middlewares/authMW');                     //-> Giao diện cho người dùng không đăng nhập
const guestMW = require('../middlewares/guestMW');                   //-> Giao diện cho người dùng đăng nhập
const adminMW = require('../middlewares/adminMW');                   //-> Giao diện admin


//----------* USERS ROUTES *----------//
router.get('/listado', authMW, adminMW, usersController.usersFullList);                       //-> Danh sách người dùng
router.get('/registro', guestMW, usersController.registerForm);                               //-> Đăng kí
router.post('/registro', multer.any(), userValidator.register, usersController.createUser);   //-> Tạo người dùng mới
router.get('/login', guestMW, usersController.loginForm);                                     //-> Đăng nhập
router.post('/login', userValidator.login, usersController.processLogin);                     //-> Đăng nhập (POST)
router.get('/perfil', authMW, usersController.profile);                                       //-> Hồ sơ người dùng
router.get('/editar', authMW, usersController.editForm);                                      //-> Chỉnh sửa người dùng
router.post('/editar', multer.any(), userValidator.edit ,usersController.editProfile);        //-> Chỉnh sửa người dùng (PUT)
router.get('/change-password', authMW, usersController.changePassForm);                       //-> thay đổi mật khẩu
router.post('/change-password', userValidator.newPass ,usersController.editPassword);         //-> Sửa đổi mật khẩu của người dùngio
router.delete('/eliminar', usersController.delete);                                           //-> Xóa người dùng trong session (DELETE)
router.get('/logout', authMW, usersController.logout);                                        //-> Đăng xuất          


//----------* EXPORTS ROUTER *----------//
module.exports = router;