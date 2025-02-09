import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import sharp from 'sharp';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function

const optimizeImage = async (buffer: Buffer) => {
  try {
    return await sharp(buffer)
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .resize(2000, 2000, {
        // Max dimensions
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();
  } catch (error) {
    console.error('Image optimization failed:', error);
    throw new UploadThingError('Failed to optimize image');
  }
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '16MB', maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log('Upload complete for userId:', metadata.userId);
        console.log('file url', file.url);

        // Fetch the image from the URL
        const response = await fetch(file.url);
        const buffer = await response.arrayBuffer();

        // Optimize the image
        const optimizedBuffer = await optimizeImage(Buffer.from(buffer));

        // Here you would typically upload the optimized buffer back
        // For now, we'll just return the original URL since UploadThing
        // doesn't provide direct buffer upload in onUploadComplete

        return { uploadedBy: metadata.userId };
      } catch (error) {
        console.error('Error processing image:', error);
        throw new UploadThingError('Failed to process image');
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
