import prisma from "@/lib/db"
import { authService } from "./auth"
import { storageService } from "./storage"
import { paymentService } from "./payments"

/**
 * Universal Infrastructure Layer (UIL)
 * Consolidates all core services into a single access point.
 */
export const infra = {
  /** Database & Persistence (Prisma + Neon) */
  db: prisma,
  
  /** Identity & Authentication (Clerk) */
  auth: authService,
  
  /** Storage & CDN (AWS S3) */
  storage: storageService,
  
  /** Billing & Subscriptions (Razorpay) */
  payments: paymentService,
  
  /** Health Check & Status */
  async getStatus() {
    return {
      auth: "ready",
      db: "ready",
      storage: process.env.AWS_BUCKET_NAME ? "configured" : "missing",
      payments: process.env.RAZORPAY_KEY_ID ? "configured" : "missing",
      timestamp: new Date().toISOString()
    }
  }
}
