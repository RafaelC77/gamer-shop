import { NextApiRequest, NextApiResponse } from "next";
import { ICartItem } from "../../contexts/CartContext";
import { stripe } from "../../services/stripe";

export default async function CompleteOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const products = req.body.map((item: ICartItem) => {
        return {
          price_data: {
            currency: "brl",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price,
          },
          quantity: item.amount,
        };
      });

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: process.env.STRIPE_SUCCESS_URL!,
        cancel_url: process.env.STRIPE_CANCEL_URL!,
        line_items: products,
      });

      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.messsage);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
