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
    
    // Sync User base record
    const userRecord = await prisma.user.upsert({
      where: { id: userId },
      update: {
        isActive: true,
      },
      create: {
        id: userId,
        isActive: true,
      },
    })

    // Optionally sync UserSettings for profile info
    await prisma.userSettings.upsert({
      where: { id: userId },
      update: {
        fullName: `${user.firstName} ${user.lastName}`.trim(),
      },
      create: {
        id: userId,
        fullName: `${user.firstName} ${user.lastName}`.trim() || "User",
        apiVersion: "v23.0",
      }
    })

    return userRecord
  },

  /** Check if user has specific permission or role */
  async hasPermission(userId: string, permission: string) {
    const user = await (await clerkClient()).users.getUser(userId)
    return !!user.publicMetadata?.[permission]
  }
}
