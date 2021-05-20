"use strict";

const { sanitizeEntity } = require("strapi-utils");

const stripe = require("stripe")('sk_test_51IlENRGPl474nMY1dMaYLQM4UyLhQGAI9VSiPmlYe0zxczRYH8qTZP7MkZ3som2iEXQ1JkeFHIYzwV0iH4gPY6Xu00hte9BErR');

/**
 * Given a dollar amount number, convert it to it's value in cents
 * @param number
 */
const fromDecimalToInt = (number) => parseInt(number * 100);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Only return orders for logged in user
   * @param {*} ctx
   */
  async find(ctx) {
    const { user } = ctx.state;
    let entities;

    //testing
    const { products } = ctx.request.body;

    if (ctx.query._q) {
      entities = await strapi.services.orders.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.orders.find({
        ...ctx.query,
        user: user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.orders })
    );
  },

  /**
   * Retrieve an order by id, only if it belongs to the user
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.orders.findOne({ id, user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.orders });
  },

  async create(ctx) {

    const BASE_URL = ctx.request.headers.origin || "http://localhost:3000"; //So we can redirect back

    const { products } = ctx.request.body;
    if (!products) {
      return res.status(400).send({ error: "Please add a products to body" });
    }

    var lineItems = [];
    var realProducts = [];
    var totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      let realProduct = await strapi.services.product.findOne({
        id: products[i].id,
      });
      if (!realProduct) {
        return res.status(404).send({ error: "This product doesn't exist" });
      }
      realProducts.push(realProduct.id); //TREBA NAPRAVITI VISE LINE ITEMA DA BI ISLO DOLE ZA STRIPE KAKO TREBA
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: realProduct.name },
          unit_amount: fromDecimalToInt(realProduct.price),
        },
        quantity: products[i].quantity,
      });
      totalPrice = totalPrice + realProduct.price*products[i].quantity;
    }

    const { user } = ctx.state; //From Magic Plugin

    try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: user.email, //Automatically added by Magic Link
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: BASE_URL,
    });
    

    //TODO Create Temp Order here
    const newOrder = await strapi.services.orders.create({
      user: user.id,
      products: realProducts,
      total: totalPrice,
      status: "unpaid",
      checkout_session: session.id,
    });
  

    return { id: session.id };
  } catch (err) {
    var ae = err.message;
    var b = null;
  }
  },

  async confirm(ctx) {
    const { checkout_session } = ctx.request.body;
    console.log("checkout_session", checkout_session);
    const session = await stripe.checkout.sessions.retrieve(
        checkout_session
    );
    console.log("verify session", session);

    if(session.payment_status === "paid"){
        //Update order
        const updateOrder = await strapi.services.orders.update(
        {
            checkout_session
        },
        {
            status: 'paid'
        });

        const newOrder = await strapi.services.orders.findOne({ checkout_session });
        return newOrder;
    } else {
        ctx.throw(400, "It seems like the order wasn't verified, please contact support");
    }
}

};
