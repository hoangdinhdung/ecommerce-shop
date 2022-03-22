//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const productsController = require('../controllers/productsController');   //-> Bộ điều khiển sản phẩm
const productValidator = require('../middlewares/productValidator');       //-> Trình xác thực cho các biểu mẫu Sản phẩm
const multer = require('../middlewares/multerProducts');                   //-> Lớp phủ cho sản phẩm
const authMW = require('../middlewares/authMW');                           //-> 
const adminMW = require('../middlewares/adminMW');                         //-> 


//----------* PRODUCTS ROUTES *----------//
router.get('/', productsController.list);                                                  //-> Hiển thị danh sách Bộ sưu tập
router.get('/sale', productsController.sale);                                              //-> Hiển thị danh sách Sale
router.get('/listado', authMW, adminMW, productsController.productsFullList);              //-> Hiển thị danh sách đầy đủ               
router.get('/crear', authMW, adminMW, productsController.createForm);                      //-> thêm sản phẩm mới / mua
router.post('/crear', multer.any(), productValidator.store, productsController.store);     //-> thêm bài viết mới
router.get('/:id/editar', authMW, adminMW, productsController.editForm);                   //-> Chỉnh sửa sản phẩm
router.put('/:id/editar', multer.any(), productValidator.edit, productsController.edit);   //-> Chỉnh sửa sản phẩm (PUT)
router.delete('/:id/eliminar', productsController.delete);                                 //-> Xóa (DELETE)
router.get('/:id', productsController.detail);                                             //-> Chi tiết Sản phẩm


//----------* EXPORTS ROUTER *----------//
module.exports = router;