import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function DELETE(req: Request) {
  const { fileId } = await req.json(); // Get the fileId from the client request

  if (!fileId) {
    return NextResponse.json({ error: "No fileId provided" }, { status: 400 });
  }

  // Delete the image from ImageKit
  try {
    const result = await imagekit.deleteFile(fileId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}