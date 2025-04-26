"use client";

import { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("fileName", file!.name);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });
    console.log("res", res);
    const data = await res.json();
    console.log("Image uploaded", data);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {image && <img src={image} alt="Preview" width={200} />}
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
