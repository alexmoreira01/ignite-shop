import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Next não faz divergencias entre GET POST DELETE -- Ele aceita todos os casos
  const { priceId } = request.body;

  // Evitar o metodo errado
  if (request.method != "POST") {
    return response.status(405).json({ error: "Method not allowed." });

  }

  if(!priceId) {
    return response.status(400).json({ error: "Price not found." });
  }

  const succesUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: succesUrl, // Urls de sucesso e de cancelamento -- redirecionar caso tenha sucesso ou erro
    cancel_url: cancelUrl,
    mode: 'payment', // Realizar 1 pagamento sem assinatura ou criação de conta, ira somente pegar os dados do cartao
    line_items: [ // Array com varias informações sobre qauis produtos vão ser comprados
    // Aqui se tem duas formas, passando o nome do produto do zero, sendo valido quando esses produtos não existem no stripe
    //ou passar price => ID do preço
      {
        price: priceId, // Identifica o produto que ira ser comprado
        quantity: 1
      }
    ]
  })

  return response.status(201).json({
    checkoutUrl: checkoutSession.url // Url para redirecionar o usuário,onde ele ira finalizar sua compra
  })
}