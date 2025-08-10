import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil'
});

export const createProduct = async (
    name: string,
    description: string,
    images: string[],
    price: number, // KSh
    tripId: string
) => {

    // 🛠 NEW: Enforce Stripe's minimum KSh 65 requirement
    // Stripe's minimum is USD $0.50 equivalent → ~KSh 65
    if (price < 65) {
        throw new Error("Stripe requires a minimum of KSh 65 per transaction.");
    }

    const product = await stripe.products.create({
        name,
        description,
        images
    });

    const priceObject = await stripe.prices.create({
        product: product.id,
        unit_amount: price * 100, // KSh to cents conversion (KES uses 2 decimal places)
        currency: 'kes'
    });

    const paymentLink = await stripe.paymentLinks.create({
        line_items: [{ price: priceObject.id, quantity: 1 }],
        metadata: { tripId },
        after_completion: {
            type: 'redirect',
            redirect: {
                url: `${process.env.BASE_URL}/travel/${tripId}/success`
            }
        }
    });

    return paymentLink;
};
