import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const imageFile = formData.get("file") as File | null;

  if (!imageFile) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const response = await imagekit.upload({
      file: buffer,
      fileName: imageFile.name,
      folder: "appointments", // optional
    });

    return NextResponse.json({ success: true, image: response });
  } catch (err: any) {
    console.error("ImageKit upload error:", err.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}