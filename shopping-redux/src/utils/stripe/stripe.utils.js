import { loadStripe } from '@stripe/stripe-js'

export const stripePRomise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)