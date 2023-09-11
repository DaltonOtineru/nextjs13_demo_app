import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import prisma from '@/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawBody = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send('Webhook signature verification failed!!!');
  }

  const stripeSession = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );

    // Update the user stripe into in our database.
    // add all subscripiton info to the user
    await prisma.user.update({
      where: {
        id: stripeSession?.client_reference_id ?? '',
      },
      data: {
        subscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        subscriptionStatus: subscription.status,
      },
    });
  }

  // Sent each billing interval when a payment succeeds.
  if (event.type === 'invoice.paid') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );

    await prisma.user.update({
      where: {
        subscriptionId: subscription.id,
      },
      data: {
        subscriptionStatus: subscription.status,
      },
    });
  }

  // Sent each billing interval if there is an issue with your customer’s payment method.
  if (event.type === 'invoice.payment_failed') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );

    await prisma.user.update({
      where: {
        subscriptionId: subscription.id,
      },
      data: {
        subscriptionStatus: subscription.status,
      },
    });
  }

  if (event.type === 'customer.subscription.updated') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );

    await prisma.user.update({
      where: {
        subscriptionId: subscription.id,
      },
      data: {
        subscriptionStatus: subscription.status,
      },
    });
  }

  if (event.type === 'customer.subscription.deleted') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );

    await prisma.user.update({
      where: {
        subscriptionId: subscription.id,
      },
      data: {
        subscriptionStatus: subscription.status,
      },
    });
  }

  res.json({ received: true });

  return res.status(200).end();
}
