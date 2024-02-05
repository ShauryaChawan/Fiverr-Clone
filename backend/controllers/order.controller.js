import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  // console.log("Intent function called");
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  try {
    // const paymentIntent = await stripe.paymentIntents.create({
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      // amount: 500,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Payment for gig: " + gig.title,
      shipping: {
        name: "Customer Name", // Replace with actual customer name
        address: {
          line1: "Manpada",
          city: "Thane",
          state: "Maharashtra",
          postal_code: "401303",
          country: "IN", // Use appropriate country code
        },
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    // console.log("No Errors!");

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    switch (err?.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${err.message}`);
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred." + err);
        break;
      default:
        console.log(
          "Another problem occurred, maybe unrelated to Stripe:" + err
        );
        break;
    }
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);

//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: "temp",
//     });

//     await newOrder.save();

//     res.status(200).send("Order Created successfull !!");
//   } catch (err) {
//     next(err);
//   }
// };
