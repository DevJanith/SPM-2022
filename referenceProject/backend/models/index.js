import { dbConfig } from "../config/db.config.js";
import Sequelize from "sequelize";

import { TutorialModal } from "./tutorial.modal.js";
import { UserModal } from "./user.model.js";
import { BuyerModal } from "./buyer.model.js";
import { TraderModal } from "./trader.model.js";
import { ItemModal } from "./item.model.js";
import { PaymentModal } from "./payment.model.js";

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tutorials = TutorialModal(sequelize, Sequelize);
db.users = UserModal(sequelize, Sequelize);
db.trader = TraderModal(sequelize, Sequelize)
db.buyer = BuyerModal(sequelize, Sequelize)
db.item = ItemModal(sequelize, Sequelize)
db.payment = PaymentModal(sequelize, Sequelize)

db.trader.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.trader, {
    foreignKey: "traderId",
    as: "trader",
});
db.buyer.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.buyer, {
    foreignKey: "buyerId",
    as: "buyer",
});
db.trader.hasMany(db.item, { as: "Items" });
db.item.belongsTo(db.trader, {
    foreignKey: "traderId",
    as: "trader",
});

db.buyer.hasMany(db.payment, { as: "payments" });
db.payment.belongsTo(db.buyer, {
    foreignKey: "buyerId",
    as: "buyer",
});


export default db;
