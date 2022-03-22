//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLER & MIDDLEWARES *----------//
const apiUsersController = require('../../controllers/api/usersController');         //-> User Controller
const apiProductsController = require('../../controllers/api/productsController');   //-> Product Controller
const apiCartController = require('../../controllers/api/cartController');           //-> Cart Controlller


//----------* USERS ROUTES *----------//
router.get('/users/', apiUsersController.list);                   //-> Danh sách người dùng
router.get('/users/list', apiUsersController.paginatedList);      //-> Danh sách người dùng được phân trang
router.get('/users/validUsers', apiUsersController.validUsers);   //->  Danh sách người dùng hợp lệ
router.get('/users/:id', apiUsersController.detail);              //->Chi tiết Người dùng


//----------* PRODUCTS ROUTES *----------//
router.get('/products/', apiProductsController.list);                            //-> Danh sách sản phẩm
router.get('/products/list', apiProductsController.paginatedList);               //-> Danh sách sản phẩm được phân trang
router.get('/products/models', apiProductsController.modelList);                 //-> Danh sách mô hình
router.get('/products/models/list', apiProductsController.paginatedModelList);   //-> Danh sách mô hình
router.get('/products/:id', apiProductsController.detail);                       //-> Chi tiết sản phẩm


//----------* CART ROUTES *----------//
router.get('/cart/orders', apiCartController.orderList);          //-> Danh sách các đơn đặt hàng đã phát hành
router.get('/cart/items', apiCartController.purchasedProducts);   //-> Danh sách các sản phẩm đã mua
router.get('/cart/users/:id', apiCartController.userStats);       //-> Thống kê người dùng
router.get('/cart/lastAdded', apiCartController.lastAdded);       //-> 5 sản phẩm cuối cùng được thêm vào giỏ hàng


//----------* EXPORTS ROUTER *----------//
module.exports = router;