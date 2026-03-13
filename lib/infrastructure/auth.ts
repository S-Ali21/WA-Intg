import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
import prisma from "@/lib/db"

/**
 * High-level Auth Service wrapper for Clerk
 */
export const authService = {
  /** Get current request session info */
  async getSession() {
    return await auth()
  },

  /** Get full user details for the active session */
  async getUser() {
    return await currentUser()
  },

  /** Sync or Create user in our local DB (Prisma) */
  async syncUser(userId: string) {
    const user = await (await clerkClient()).users.getUser(userId)
    
    return await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim(),
      },
      create: {
        clerkId: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: `${user.firstName} ${user.lastName}`.trim() || "User",
      },
    })
  },

  /** Check if user has specific permission or role */
  async hasPermission(userId: string, permission: string) {
    const user = await (await clerkClient()).users.getUser(userId)
    return !!user.publicMetadata?.[permission]
  }
}
