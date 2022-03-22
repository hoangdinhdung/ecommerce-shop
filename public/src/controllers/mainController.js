//----------* REQUIRE'S *----------//
const db = require('../db/models');


//----------* MAIN CONTROLLER *----------//
const mainController = {
    // Hiển thị Homepage
    index: (req, res, next) => {
        res.render('index');
    },

    // Renderiza la vista Resultado de la busqueda
    search: async (req, res) => {
        try {
            const search = req.query.search.toLowerCase();
        
            const products = await db.Product.findAll({
                include: [{
                    all: true,
                    nested: true
                }],
                order: [
                    ['id']
                ]/* ,
                group: ['model.id'] */
            });
    
            const productFound = products.filter(product => {
                return product.model.category.name.toLowerCase().includes(search) || product.model.name.toLowerCase().includes(search) || product.model.color.name.toLowerCase().includes(search);
            });
    
            res.render('products/searchResults', { productFound	});

        }catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },
    
    // Hiển thị About us    
    aboutUs: (req, res) => {        
        res.render('main/aboutUs');
    },

    // Hiển thị trang hướng dẫn cách mua
    howToBuy: (req, res) => {        
        res.render('main/howToBuy');
    }
};


//----------* EXPORTS CONTROLLER *----------//
module.exports = mainController;