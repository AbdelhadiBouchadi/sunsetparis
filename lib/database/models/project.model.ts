import { Schema, Document, model, models } from 'mongoose';

// Interface
export interface IProject extends Document {
  _id: string;
  title: string;
  description: string;
  artist:
    | 'arthur paux'
    | 'gabriel porier'
    | 'kevin le dortz'
    | 'mathieu caplanne'
    | 'nicolas gautier'
    | 'romain loiseau'
    | 'thomas canu';
  imageUrl: string;
  videoSource: string;
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
  imageUrl: { type: String },
  videoSource: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
