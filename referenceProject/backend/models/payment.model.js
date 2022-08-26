export const PaymentModal = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        total: {
            type: Sequelize.STRING,
        },
        cardNumber: {
            type: Sequelize.STRING,
        },
        cardholdersName: {
            type: Sequelize.STRING,
        },
        cardExpiryDate: {
            type: Sequelize.STRING,
        },
        cardCvv: {
            type: Sequelize.STRING,
        },
        phoneNumber: {
            type: Sequelize.STRING,
        },
        paymentType: {
            type: Sequelize.STRING,
        },
        paymentGatewayId: {
            type: Sequelize.STRING,
        }
    });
    return Payment;
} 