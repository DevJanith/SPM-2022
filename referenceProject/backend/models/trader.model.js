export const TraderModal = (sequelize, Sequelize) => {
    const Trader = sequelize.define("trader", {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        }
    });
    return Trader;
} 