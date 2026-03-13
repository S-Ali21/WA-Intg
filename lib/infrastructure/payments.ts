import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/razorpay"
import prisma from "@/lib/db"

/**
 * High-level Payment Service wrapper for Razorpay
 */
export const paymentService = {
  /** Create a new transaction/order */
  async createSubscriptionOrder(userId: string, amount: number) {
    return await createRazorpayOrder(amount, userId)
  },

  /** Verify a completed payment signature */
  async validate(orderId: string, paymentId: string, signature: string) {
    return verifyRazorpaySignature(orderId, paymentId, signature)
  },

  /** Check subscription status from local DB logic */
  async getStatus(userId: string) {
    return await prisma.subscription.findFirst({
      where: {
        userId,
        status: "active",
      },
      orderBy: { createdAt: "desc" },
    })
  }
}
