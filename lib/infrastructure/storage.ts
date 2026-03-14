import { uploadFileToS3, generatePresignedUrl } from "@/lib/aws-s3"

/**
 * High-level Storage Service wrapper for AWS S3
 */
export const storageService = {
  /** Upload a File object directly to S3 */
  async upload(file: File, senderId: string, mediaId: string) {
    return await uploadFileToS3(file, senderId, mediaId)
  },

  /** Generate a secured URL for private media using WhatsApp-style logic */
  async getAccessUrl(senderId: string, mediaId: string, mimeType: string, expiresIn = 3600) {
    return await generatePresignedUrl(senderId, mediaId, mimeType, expiresIn)
  },

  /** Generate a secured URL using a direct S3 key */
  async getAccessUrlByKey(key: string, expiresIn = 3600) {
    const { generatePresignedUrlByKey } = await import("@/lib/aws-s3")
    return await generatePresignedUrlByKey(key, expiresIn)
  },

  /** Simplified helper for public assets */
  getPublicUrl(fileKey: string) {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`
  }
}
