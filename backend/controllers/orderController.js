
const createHttpError = require("http-errors");
const Order = require("../modals/orderModal");
const mongoose = require("mongoose");
 const addOrder = async (req, res, next) => {
    try {
        const {customerDetails, orderStatus, bills, items} = req.body;
        const order = new Order({customerDetails, orderStatus, bills, items});
        await order.save();
        res.status(201).json({
            success: true,
            message: "Order added successfully!",
            data: order,
        });

    }catch (error) {
        next(error);
    }

 }
  const getOrder = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            const error = createHttpError(404, "Order not found");
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Order retrieved successfully!",
            data: order
        });

    }catch (error) {
        next(error);
    }

  }
  const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully!",
            data: orders
        });
    } catch(error) {
        next(error);
    }
  }

const updateOrder = async (req, res, next ) =>{
    try{
        console.log("Update request received:");
        console.log("Order ID:", req.params.id);
        console.log("Request body:", req.body);

        const {orderStatus} = req.body;
        const { id } = req.params;
          if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404,"invalid id!");
            return next(error);

        }
        console.log("Extracted orderStatus:", orderStatus);

        const order = await Order.findByIdAndUpdate(
            id,
            {orderStatus},
            {new: true}
        );

        console.log("Updated order:", order);

        if(!order){
            const error = createHttpError(404,"Order not found!");
            return next(error);
        }
        res.status(200).json({success: true, message: "order updated", data: order});

    } catch (error) {
        console.log("Update error:", error);
        next(error);
    }

}
module.exports = {addOrder, getOrder, getAllOrders, updateOrder};