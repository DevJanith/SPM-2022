import db from "../models/index.js"
const Item = db.item;


// Create and Save a new Item
export const create = (req, res) => {
    // Validate request
    if (!req.body.traderId) {
        res.status(400).send({
            message: "Trader Can not be empty!"
        });
        return;
    }
    // Create a Item
    const item = {
        name: req.body.name,
        description: req.body.description,
        qty: req.body.qty,
        price: req.body.price,
        traderId: req.body.traderId
    };
    // Save Item in the database
    Item.create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Item."
            });
        });

};

// Retrieve all Items from the database.
export const findAll = (req, res) => {
    Item.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Items."
            });
        });
};

// Find a single Item with an id
export const findOne = (req, res) => {
    const id = req.params.id;
    Item.findByPk(id)
        .then(data => {
            if (data)
                res.send(data)
            else {
                res.status(404).send({ message: "Can not find the Item with id : " + id });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Item with id : " + id
            })
        })
}

// Update a Tutorial by the id in the request
export const update = (req, res) => {

    const id = req.params.id;

    Item.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was updated successfully"
                })
            } else {
                res.send({
                    message: "Can not update Item with id: " + id + "Maybe Item was not found or req.body is empty!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            })
        });
}


// Delete a Tutorial with the specified id in the request
export const deleteOne = (req, res) => {
    const id = req.params.id;
    Item.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};
// Delete all Tutorials from the database.
export const deleteAll = (req, res) => {
    Item.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Items were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Items."
            });
        });
};

