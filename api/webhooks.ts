import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClerkClient } from '@clerk/backend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })

export const config = { api: { bodyParser: false } }

function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature'] as string
  const rawBody = await getRawBody(req)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return res.status(400).json({ error: `Webhook signature verification failed: ${message}` })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.client_reference_id ?? session.metadata?.userId
      if (!userId) break

      const isSub = session.mode === 'subscription'
      const update = isSub
        ? { courseAccess: true, subscriptionActive: true, stripeCustomerId: session.customer }
        : { courseAccess: true, stripeCustomerId: session.customer }

      await clerk.users.updateUserMetadata(userId, { publicMetadata: update })
      break
    }

    case 'customer.subscription.created': {
      const sub = event.data.object as Stripe.Subscription
      const customer = await stripe.customers.retrieve(sub.customer as string)
      if (customer.deleted) break
      const userId = (customer as Stripe.Customer).metadata?.userId
      if (!userId) break
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: { subscriptionActive: true },
      })
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const customer = await stripe.customers.retrieve(sub.customer as string)
      if (customer.deleted) break
      const userId = (customer as Stripe.Customer).metadata?.userId
      if (!userId) break
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: { subscriptionActive: false },
      })
      break
    }
  }

  return res.status(200).json({ received: true })
}
