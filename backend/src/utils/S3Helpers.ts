import multer from "multer";
import sharp from "sharp";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// S3 client config
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
});


export async function directUpload(
    file: { buffer: Buffer; originalname: string; mimetype: string },
    location: string
  ): Promise<{ message: string; signedUrl: string,fileKey:string,publicLink:string }> {
    if (!file) {
      throw new Error("Document is required for upload");
    }

    const links = await uploadFileToS3(
      file.buffer,
      file.originalname,
      location,
      file.mimetype
    );

    if (!links.fileUrl || !links.uniqueFileName) {
      throw new Error("Failed to upload document to S3");
    }

    let signedUrl: string = await getSignedImageURL(links.uniqueFileName);

    if (!signedUrl) {

      throw new Error("Failed to upload document to S3");
    }

    return {
      message: "Document uploaded successfully",
      signedUrl: signedUrl,
      fileKey:links.uniqueFileName,
      publicLink:links.fileUrl
    };
  };


export async function uploadFileToS3(
  fileBuffer: Buffer,
  fileName: string,
  folderName: string,
  mimetype: string
) {
  const uniqueFileName = `${folderName}/${uuidv4()}${path.extname(fileName)}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: uniqueFileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

  return {uniqueFileName,fileUrl};
};


export const getSignedImageURL = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 604800 }); // 1 week expiry
};