import stripe from '@/lib/stripe';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { user } = session || {};

  try {
    const session = await stripe.checkout.sessions.create({
      client_reference_id: user.id,
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/subscribe`,
    });
    return NextResponse.redirect(session.url as string, { status: 303 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
