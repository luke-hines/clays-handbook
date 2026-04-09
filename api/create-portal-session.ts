import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { customerId } = req.body as { customerId: string }

  if (!customerId) {
    return res.status(400).json({ error: 'Missing customerId' })
  }

  const origin = req.headers.origin ?? 'https://clayshandbook.com'

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/`,
  })

  return res.status(200).json({ url: session.url })
}
