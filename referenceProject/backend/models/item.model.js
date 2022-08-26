export const ItemModal = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        qty: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.STRING
        }
    });
    return Item;
} 