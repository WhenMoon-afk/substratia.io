import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

// Initialize Stripe (will fail gracefully if not configured)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" })
  : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured. Please set STRIPE_SECRET_KEY." },
        { status: 500 }
      );
    }

    // Get authenticated user
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in to subscribe" },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { tier } = body;

    // Map tier to price ID
    const priceIds: Record<string, string | undefined> = {
      pro: process.env.STRIPE_PRO_PRICE_ID,
      team: process.env.STRIPE_TEAM_PRICE_ID,
    };

    const priceId = priceIds[tier];
    if (!priceId) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}. Price ID not configured.` },
        { status: 400 }
      );
    }

    // Get user email from Clerk (needed for Stripe customer)
    const email = sessionClaims?.email as string | undefined;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      client_reference_id: userId, // Link to Clerk user
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://substratia.io"}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://substratia.io"}/?checkout=cancelled`,
      metadata: {
        clerkUserId: userId,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
