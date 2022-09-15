import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paymentIntent = stripe.paymentIntents.create({
    amount: 999,
    currency: "brl",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: (await paymentIntent).client_secret,
  });
}
