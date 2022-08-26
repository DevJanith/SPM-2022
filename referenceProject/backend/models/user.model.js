export const UserModal = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING
        }
    });
    return User;
} 