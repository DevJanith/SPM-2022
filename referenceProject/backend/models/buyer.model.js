export const BuyerModal = (sequelize, Sequelize) => {
    const Buyer = sequelize.define("buyer", {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        }
    });
    return Buyer;
} 