//----------* REQUIRE'S *----------//
const db = require('../db/models');


//----------* MAIN CONTROLLER *----------//
const cartController = {
    // Hiển thị Giỏ hàng    
    cart: async (req, res) => {
        try {
            // Tìm kiếm các sản phẩm tương ứng với người dùng trong session
            const cartItems =  await db.Item.findAll({where:{
                user_id: req.session.user.id,
                status: 0
            }})

            res.render('products/productCart', { cartItems });

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },
    
    // Thêm một sản phẩm vào giỏ hàng
    addItem:  async (req, res) => {
        try {
            // Tìm mặt hàng cần tải trong giỏ hàng theo "id" của nó và lưu nó
            const productToAdd = await db.Product.findByPk(req.params.id, {
                include: { 
                    all: true, 
                    nested: true
                }
            });

            let quantity = req.body.productsQuantity;

            // Tạo một mặt hàng mới với "id" của người dùng trong session và dữ liệu của sản phẩm sẽ tải
            // Hoàn thành các trường "status" = 0 và "order_id" = null

            await db.Item.create({
                name: productToAdd.model.name,
                color: req.body.color,
                size: req.body.size,
                category: productToAdd.model.category.name,
                description: productToAdd.model.description,
                image: productToAdd.model.image.name,
                price: productToAdd.price,
                quantity: quantity,
                subtotal: productToAdd.discount.number > 0 ? (productToAdd.price-((productToAdd.price*productToAdd.discount.number)/100)) * quantity : productToAdd.price * quantity,
                status: 0,
                user_id: req.session.user.id,
                order_id: null
            });

            // Redirecciona Carrito
            return res.redirect('/carrito');

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Elimina un Producto del Carrito
    removeItem: async (req, res) => {
        try {
            await db.Item.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            return res.redirect('/carrito');

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Procesa la Compra del Producto
    buyItem: async (req,res) => {
        try {
            const itemsToBuy =  await db.Item.findAll({
                where:{
                    user_id: req.session.user.id,
                    status: 0
                }
            });
    
            let totalPrice = 0;
    
            itemsToBuy.forEach(element => {
                totalPrice = totalPrice + element.subtotal
            });
    
            let newOrder = await db.Order.create({
                user_id: req.session.user.id,
                total: totalPrice
            });
    
            let orderId = newOrder.id;
    
            await db.Item.update({
                status: 1,
                order_id: orderId
            },
            {where: {
                status: 0,
                user_id: req.session.user.id
                }
            });
    
            return res.redirect('/carrito/compra-finalizada');

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    // Renderiza la vista Compra Finalizada
    purchaseCompleted: (req,res) => {
        return res.render('products/purchaseCompleted');
    },

    // Renderiza la vista Mis Compras
    myPurchases: async (req,res) => {
        try {
            purchasedItems = await db.Item.findAll({
                where: {
                    status: 1,
                    user_id: req.session.user.id
                }
            });
    
            return res.render('products/myPurchases', { purchasedItems });

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = cartController;