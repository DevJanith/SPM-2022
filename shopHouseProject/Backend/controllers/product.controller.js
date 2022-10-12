import mongoose from 'mongoose';

import Product from "../models/product.model.js";


//get all Products that has approved
export const getProducts = async (req, res) => {
    try {
        const Products = await Product.find();

        res.status(200);
        res.json(Products);

    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: { message: error.message }
        }
    }
}

//add Product
export const createProduct = async (req, res) => {
    // const {
    //     name,
    //     description,
    //     qty,
    //     price
    // } = req.body;

    // try {
    //     if (name === null || typeof name == "undefined") return res.status(400).json({ message: "Name Field Required" })
    //     if (description === null || typeof description == "undefined") return res.status(400).json({ message: "Description Field Required" })
    //     if (qty === null || typeof qty == "undefined") return res.status(400).json({ message: "Quantity Field Required" })
    //     if (price === null || typeof price == "undefined") return res.status(400).json({ message: "Price Field Required" })

    const product = req.body;

    const newProduct = new Product(product);
    try {
        await newProduct.save();

        res.status(201);
        res.json(newProduct);

    } catch (error) {
        res.status(409);
        res.json({ message: error.message });
    }
}

// export const signUp = async (req, res) => {
//     const {
//         email,
//         password,
//         confirmPassword,
//         type,
//         userFirstName,
//         userLastName,
//         userContactNumber,
//         userAddressLine1,
//         userAddressLine2,
//         userAddressLine3,
//     } = req.body;

//     try {
//         if (type === null || typeof type == "undefined") return res.status(400).json({ message: "Type Field Required" })
//         if (email === null || typeof email == "undefined") return res.status(400).json({ message: "Email Field Required" })
//         if (password === null || typeof password == "undefined") return res.status(400).json({ message: "Password Field Required" })
//         if (userFirstName === null || typeof userFirstName == "undefined") return res.status(400).json({ message: "User First Name Field Required" })
//         if (userLastName === null || typeof userLastName == "undefined") return res.status(400).json({ message: "User Last Name Field Required" })
//         if (userContactNumber === null || typeof userContactNumber == "undefined") return res.status(400).json({ message: "User Contact Number Field Required" })

//         const existingUser = await User.findOne({ email: email })

//         if (existingUser) return res.status(400).json({ message: "User already exist" })
//         if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" })

//         const hashPassword = await bcrypt.hash(password, 12)

//         const userDetails = new User({
//             email: email,
//             password: hashPassword,
//             type: type,
//             userDetails: {
//                 userQNumber: uuid(),
//                 userEmail: email,
//                 userName: `${userFirstName} ${userLastName}`,
//                 userContactNumber: userContactNumber,
//                 userAddress: `${userAddressLine1}, ${userAddressLine2}, ${userAddressLine3}`,
//                 userType: type,
//             }
//         })

//         const userResult = await userDetails.save()

//         const token = jwt.sign({ email: userResult.email, id: userResult._id }, 'test', { expiresIn: "1h" })

//         res.status(200).json({ result: userResult, token })

//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" })
//     }
// }

//get one Product that has approved

export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        res.status(200);
        res.json(product);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

//update Products that has approved
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { itemCategory, itemName, itemPrice, itemQuantity, itemDescription } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No Product with id: ${id}`);
        }

        const updatedProduct = { itemCategory, itemName, itemPrice, itemQuantity, itemDescription, _id: id };

        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

        res.status(200);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

//delete Products that has approved
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No Product with id: ${id}`);
        }

        await Product.findByIdAndDelete(id);
        res.status(200);
        res.json({ "message": "Product Deleted Successfully" });
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}


/* 

//get report data
export const getFeedbackReport = async (req, res) => {
  const startDate = req.body.start;
  const endDate = req.body.end;

  try {
    const Feedbacks = await Feedback.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({
      date: 1,
    });

    res.status(200);

    if (Feedbacks.length != 0) {
      res.json({
        filter: {
          startDate,
          endDate,
        },
        data: Feedbacks,
      });
    } else {
      res.json({
        message: "No Data for selected filter",
        data: null,
      });
    }
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

*/