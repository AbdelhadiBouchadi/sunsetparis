import { Schema, Document, model, models } from 'mongoose';

// Interface
export interface IProject extends Document {
  _id: string;
  title: string;
  description?: string;
  artist:
    | 'arthur paux'
    | 'gabriel porier'
    | 'kevin le dortz'
    | 'mathieu caplanne'
    | 'nicolas gautier'
    | 'romain loiseau'
    | 'thomas canu';
  images: string[];
  videoSource?: string;
  place?: string;
  date?: string;
  real: string;
  dop: string;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  artist: {
    type: String,
    enum: [
      'arthur paux',
      'gabriel porier',
      'kevin le dortz',
      'mathieu caplanne',
      'nicolas gautier',
      'romain loiseau',
      'thomas canu',
    ],
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  videoSource: {
    type: String,
    required: false,
  },
  place: { type: String },
  date: { type: String },
  real: { type: String },
  dop: { type: String },
  order: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
