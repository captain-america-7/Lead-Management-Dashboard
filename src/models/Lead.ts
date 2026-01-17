import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
  source: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
      default: 'New',
      index: true,
    },
    source: { type: String, required: true, index: true },
    assignedTo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Add text index for search
LeadSchema.index({ name: 'text', email: 'text', phone: 'text' });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
