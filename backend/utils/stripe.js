import stripe from 'stripe'
import dotenv from "dotenv"
dotenv.config()

const Stripe=stripe(process.env.STRIPE_PRIVATE_KEY)

export default Stripe
