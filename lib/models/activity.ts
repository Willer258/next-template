import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true, index: true },
    action: { type: String, required: true },
    userId: { type: String, index: true },
    organizationId: { type: String, index: true },
    metadata: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
)

activitySchema.index({ createdAt: -1 })
activitySchema.index({ organizationId: 1, createdAt: -1 })

export const ActivityModel =
  mongoose.models.Activity || mongoose.model('Activity', activitySchema)
