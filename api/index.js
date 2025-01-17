const express = require('express');
const jwt_decode = require('jwt-decode')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const cors =  require('cors')
const jwt = require('jsonwebtoken');
const Client = ''
const app = express();
const port =8000;

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
// Confiquration for CORS browser policy
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );

//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

app.use(cors())

mongoose.connect(Client).then(() =>{
    console.log('connected to mongodb');
}).catch((err) =>{
    console.log("Error mongo "+ err);
})

app.listen(port,() =>{
    console.log('run app',port,"port");
});
const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure the email service or SMTP details here
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });
  
    // Compose the email message
    const mailOptions = {
      from: "",
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: http://192.168.100.46:8000/verify/${verificationToken}`,
    };
  
    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

app.post("/register", async (req, res) => {
    console.log('start register',req.body);
    try {
      const { name, email, password } = req.body;
  console.log(name,'name');
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email); // Debugging statement
        return res.status(400).json({ message: "Email already registered" });
      }

      //hash password
      // Create a new user
      const newUser = new User({ name, email, password });
  
      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
  
      // Save the user to the database
      await newUser.save();
  
      // Debugging statement to verify data
      console.log("New User Registered:", newUser);
  
      // Send verification email to the user
      // Use your preferred email service or library to send the email
      sendVerificationEmail(newUser.email, newUser.verificationToken);
  
      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error); // Debugging statement
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.get("/verify/:token", async (req, res) => {
    try {
      const token = req.params.token;
  
      //Find the user witht the given verification token
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
  
      //Mark the user as verified
      user.verified = true;
      user.verificationToken = undefined;
  
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  });


  const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();
  
  //endpoint to login the user!
  app.post("/login", async (req, res) => {
    console.log('sttart  login');
    try {
      const { email, password } = req.body;
  
      //check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      //check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      //generate a token
      const token = jwt.sign({ userId: user._id }, secretKey);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Login Failed" });
    }
  });

  app.post("/addresses", async (req, res) => {
    try {
      const { userId, address } = req.body;

      console.log(userId,'userId /addresses');
      //find the user by the Userid
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      //add the new address to the user's addresses array
      user.addresses.push(address);
  
      //save the updated user in te backend
      await user.save();
  
      res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error addding address" });
    }
  });
  app.patch("/addresses", async (req, res) => {
    console.log('patch url');
    try {
      const { userId, address ,addressId} = req.body;

      console.log(userId,'userId /addresses');
      //find the user by the Userid
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const existingAddress = user.addresses.findIndex(x => x._id.toString() === addressId);
      console.log(existingAddress,'existingAddress');
      if (!existingAddress && existingAddress !==  0) {
        return res.status(404).json({ message: "Could not edit address that did not exist" });
      }
  //664a5d935f150b3560e321ac
      //add the new address to the user's addresses array
      let _id = user.addresses[existingAddress]._id;
      user.addresses[existingAddress] = {...address,_id};
  
      //save the updated user in te backend
     await user.save();
  
      res.status(200).json({ message: "Address updated Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating address" });
    }
  });
  app.delete("/addresses/:userId/:addressId", async (req, res) => {
    console.log('delete url');
    try {
      const { userId ,addressId} = req.params;
      console.log(userId,'userId',addressId,'idAddres');
      //find the user by the Userid
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const existingAddress = user.addresses.find(x => x._id.toString() === addressId);
      console.log(existingAddress,'existingAddress');
      if (!existingAddress && existingAddress !==  0) {
        return res.status(404).json({ message: "Could not delete address that did not exist" });
      }

      const updatedArray= user.addresses.filter(x => x._id.toString() !== addressId)
      user.addresses = updatedArray;
      //save the updated user in te backend
     await user.save();
  
      res.status(200).json({ message: "Address deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting address" });
    }
  });


  app.get("/addresses/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
console.log(userId,'address/userid');
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const addresses = user.addresses;
      res.status(200).json({ addresses });
    } catch (error) {
      res.status(500).json({ message: "Error retrieveing the addresses" });
    }
  });

  app.post("/orders", async (req, res) => {
    try {
      const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
        req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      //create an array of product objects from the cart Items
      const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image,
      }));
  
      //create a new Order
      const order = new Order({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
      });
  console.log('Orderrrr',order);
      await order.save();
  
      res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
      console.log("error creating orders", error);
      res.status(500).json({ message: "Error creating orders" });
    }
  });
  
  //get the user profile
  app.get("/profile/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving the user profile" });
    }
  });
  
  app.get("/orders/:userId",async(req,res) => {
    try{
      const userId = req.params.userId;
  
      const orders = await Order.find({user:userId}).populate("user");
  
      if(!orders || orders.length === 0){
        return res.status(404).json({message:"No orders found for this user"})
      }
  
      res.status(200).json({ orders });
    } catch(error){
      res.status(500).json({ message: "Error"});
    }
  })