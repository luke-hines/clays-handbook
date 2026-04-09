import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { priceId, userId, email } = req.body as {
    priceId: string
    userId: string
    email: string
  }

  if (!priceId || !userId) {
    return res.status(400).json({ error: 'Missing priceId or userId' })
  }

  const origin = req.headers.origin ?? 'https://clayshandbook.com'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: priceId === process.env.STRIPE_SUBSCRIPTION_PRICE_ID ? 'subscription' : 'payment',
    customer_email: email,
    client_reference_id: userId,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    metadata: { userId },
  })

  return res.status(200).json({ url: session.url })
}
