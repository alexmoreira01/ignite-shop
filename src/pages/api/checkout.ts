import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { IProduct } from "../../contexts/CartContext";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Next não faz divergencias entre GET POST DELETE -- Ele aceita todos os casos

  // const { priceId } = request.body; // Antes
  const { products } = request.body as { products: IProduct[] };

  // Evitar o metodo errado
  if (request.method != "POST") {
    return response.status(405).json({ error: "Method not allowed." });

  }

  // if(!priceId) {
    // return response.status(400).json({ error: "Price not found." });
  // }
  if(!products) {
    return response.status(400).json({ error: "Products not found." });
  }

  const succesUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: succesUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1
    }))
    /*
    Antes
    [
      {
        price: priceId,
        quantity: 1
      }
    ]
    */
  });

  return response.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}