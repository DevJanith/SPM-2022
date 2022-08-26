import db from "../models/index.js"
const Payment = db.payment;


// Create and Save a new Payment
export const create = (req, res) => {
    // Validate request
    if (req.body.paymentType == null || req.body.buyerId == null) {
        res.status(400).send({
            message: "Payment Type and Payer ID Can not be empty!"
        });
        return;
    }
    // Create a Payment
    const payment = {
        total: req.body.total,
        // cardNumber: req.body.cardNumber,
        // cardholdersName: req.body.cardholdersName,
        // cardExpiryDate: req.body.cardExpiryDate,
        // cardCvv: req.body.cardCvv,
        paymentGatewayId: req.body.paymentGatewayId,
        // phoneNumber: req.body.phoneNumber,
        paymentType: req.body.paymentType,
        buyerId: req.body.buyerId
    };
    // Save Payment in the database
    Payment.create(payment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Payment."
            });
        });

};
// Retrieve all Payments from the database.
export const findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Payment.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Payments."
            });
        });
};
// Find a single Payment with an id
export const findOne = (req, res) => {
    const id = req.params.id;
    Payment.findByPk(id)
        .then(data => {
            if (data)
                res.send(data)
            else {
                res.status(404).send({ message: "Can not find the Payment with id : " + id });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Payment with id : " + id
            })
        })
}

// Update a Payment by the id in the request
export const update = (req, res) => {

    const id = req.params.id;

    Payment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Payment was updated successfully"
                })
            } else {
                res.send({
                    message: "Can not update Payment with id: " + id + "Maybe Payment was not found or req.body is empty!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Payment with id=" + id
            })
        });
}


// Delete a Payment with the specified id in the request
export const deleteOne = (req, res) => {
    const id = req.params.id;
    Payment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Payment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Payment with id=" + id
            });
        });
};
// Delete all Payments from the database.
export const deleteAll = (req, res) => {
    Payment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Payments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Payments."
            });
        });
};

// Find all published Payments
export const findAllPublished = (req, res) => {
    Payment.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Payments."
            });
        });
};