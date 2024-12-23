import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// Initialize the S3 client with your NameCheap hosting credentials
const s3Client = new S3Client({
  endpoint: process.env.NAMECHEAP_STORAGE_ENDPOINT,
  region: process.env.NAMECHEAP_STORAGE_REGION,
  credentials: {
    accessKeyId: process.env.NAMECHEAP_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NAMECHEAP_SECRET_ACCESS_KEY!,
  },
});

export async function saveData(key: string, data: any) {
  const params = {
    Bucket: process.env.NAMECHEAP_STORAGE_BUCKET_NAME,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: "application/json",
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(`Data saved successfully: ${key}`);
  } catch (error) {
    console.error(`Error saving data: ${key}`, error);
    throw error;
  }
}

export async function getData(key: string) {
  const params = {
    Bucket: process.env.NAMECHEAP_STORAGE_BUCKET_NAME,
    Key: key,
  };

  try {
    const { Body } = await s3Client.send(new GetObjectCommand(params));
    if (Body) {
      const bodyContents = await Body.transformToString();
      return JSON.parse(bodyContents);
    }
    return null;
  } catch (error) {
    console.error(`Error retrieving data: ${key}`, error);
    throw error;
  }
}

