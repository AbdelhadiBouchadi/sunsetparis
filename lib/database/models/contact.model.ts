import { Schema, Document, model, models } from 'mongoose';

// Interface
export interface IContact extends Document {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = models.Contact || model<IContact>('Contact', ContactSchema);

export default Contact;
