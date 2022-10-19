import mongoose from 'mongoose';
import Item from "../models/item.models.js";
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


  try {
    //update the item
    const item = req.body;
    delete item.status;

    if (!mongoose.Types.ObjectId.isValid(item._id)) {
      return res.status(404).send(`No Item with id: ${item._id}`);
    }
    const updateProduct = { status: 0, ...item };
    await Item.findByIdAndUpdate(item._id, updateProduct, { new: true });

    //create the product
    const product = req.body;
    delete product._id;

    const newProduct = new Product(product);
    await newProduct.save();

    res.status(201);
    // res.json({
    //   updatedProductData: updateProduct,
    //   savedProductData: newProduct
    // });
    res.json(updateProduct);

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

//get report data
export const getProductReport = async (req, res) => {
  const startDate = req.body.start;
  const endDate = req.body.end;

  try {
    const Products = await Product.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({
      date: 1,
    });

    res.status(200);

    if (Products.length != 0) {
      res.json({
        filter: {
          startDate,
          endDate,
        },
        data: Products,
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
