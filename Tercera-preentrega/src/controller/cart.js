import cartContainer from "../daos/services/cartContainer.js";
import productContainer from "../daos/services/productContainer.js";
import userContainer from "../daos/services/userContainer.js";
const cart = new cartContainer();
const product = new productContainer();
const user = new userContainer();

import cartStorage from "../daos/services/cartStorage.js";
const CartStorage = new cartStorage();

import { mailingGmail } from "../daos/services/mailingContainer.js";
import { createHtml as _createHtml } from "../utils/ticketHTML";

import whatsAppTwilio from "../daos/services/whatsAppTwilio.js";

import smsTwilio from "../sms/twilio";

export async function postCartSession(req, res, next) {
  const response = CartStorage.addProductsToSession(req.body, req.session);
  res.redirect("/api/cart/get-session");
}

export async function getCartSession(req, res, next) {
  const response = CartStorage.getProductsFromSession(req.session.cartSession);
  // res.json(response);
  res.render("./pages/checkout-cart", { response });
}

export async function createCart(req, res, next) {
  console.log("run createCart");
  try {
    const cartBody = req.session.cartSession;
    const finalCart = {
      productsOnCart: [],
    };

    for (i = 0; i < cartBody.length; i++) {
      let productFinded = await product.getProduct(cartBody[i].id);
      finalCart.productsOnCart.push({
        product: productFinded,
        quantity: cartBody[i].quantity,
      });
    }
    const cartCreated = await cart.createCart(finalCart);

    const idUser = { _id: req.session.passport.user._id };
    console.log("idUser");
    console.log(idUser);

    const cartAddToUser = await user.addCartToUser(idUser, finalCart);

    const emailSubject = `${req.session.passport.user.name}'s new request - email: ${req.session.passport.user.email}`;
    const emailBody = _createHtml(cartCreated);

    await mailingGmail({
      from: "Server Node.js",
      to: ["donny67@ethereal.email", process.env.GMAIL_USER],
      subject: emailSubject,
      html: emailBody,
    });
    await whatsAppTwilio(emailSubject, req.session.passport.user.number);
    await smsTwilio(
      req.session.passport.user.number,
      "We received the order correctly. It is in process."
    );

    delete req.session.cartSession;

    res.render("./pages/welcome");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export async function getProductOnCart(req, res, next) {
  console.log("run getProductOnCart");
  try {
    const idCart = req.query.idCart;
    const idProduct = req.query.idProduct;
    const productsOnCart = await cart.getProductOnCart(idCart);
    if (idProduct) {
      const productFinded = productsOnCart.product.find(
        (product) => product.code == idProduct
      );
      res.json(productFinded);
    } else {
      res.json(productsOnCart);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export async function deleteProductOnCart(req, res, next) {
  console.log("Run deleteProductOnCart");
  try {
    const idCartQuery = req.query.idCart;
    const idProductQuery = req.query.idProduct;
    const productToBeDeletedOnCart = {
      idCart: idCartQuery,
      idProduct: idProductQuery,
    };
    const productsOnCart = await cart.deleteProductOnCart(
      productToBeDeletedOnCart
    );
    res.json(productsOnCart);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export async function getAllCarts(req, res, next) {
  try {
    const carts = await cart.getAllCarts();
    res.json(carts);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
