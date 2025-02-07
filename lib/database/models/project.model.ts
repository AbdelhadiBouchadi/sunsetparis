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
    | 'thomas canu'
    | 'abdelhadi bouchadi'
    | 'evy roselet'
    | 'salman laudier';
  images: string[];
  thumbnailIndex: number;
  category: 'videos' | 'features';
  videoSource?: string;
  place?: string;
  date?: string;
  real: string;
  dop: string;
  order: number;
  textColor: 'white' | 'black';
  isHidden: boolean;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: false },
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
      'abdelhadi bouchadi',
      'evy roselet',
      'salman laudier',
    ],
    required: true,
  },
  category: {
    type: String,
    enum: ['videos', 'features'],
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  thumbnailIndex: {
    type: Number,
    default: 0,
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
  textColor: { type: String, enum: ['white', 'black'], required: true },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
