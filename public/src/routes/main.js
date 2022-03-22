//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();


//----------* CONTROLLERS & MIDDLEWARES *----------//
const mainController = require('../controllers/mainController');   //-> main controller


//----------* MAIN ROUTES *----------//
router.get('/', mainController.index);                  //-> Hiển thị trang chủ
router.get('/buscar', mainController.search);           //-> Kết quả tìm kiếm
router.get('/nosotros', mainController.aboutUs);        //-> about us
router.get('/como-comprar', mainController.howToBuy);   //-> cách mua


//----------* EXPORTS ROUTER *----------//
module.exports = router;