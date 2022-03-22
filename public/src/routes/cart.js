//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const cartController = require('../controllers/cartController');   //-> Controller giỏ hàng


//----------* MAIN ROUTES *----------//
router.get('/', cartController.cart);                                 //-> Hiển thị giỏ hàng
router.post('/:id/agregar', cartController.addItem);                  //-> Thêm Sản phẩm vào Giỏ hàng.
router.post('/:id/eliminar', cartController.removeItem);              //-> Loại bỏ một sản phẩm khỏi giỏ hàng
router.post('/finalizar-compra', cartController.buyItem);             //-> Xử lý việc mua sản phẩm
router.get('/compra-finalizada', cartController.purchaseCompleted);   //-> Hiển thị chế độ xem Đã hoàn tất mua hàng
router.get('/mis-compras', cartController.myPurchases);               //-> Hiển thị chế độ xem Giao dịch mua của tôi


//----------* EXPORTS ROUTER *----------//
module.exports = router;