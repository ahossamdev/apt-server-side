import multer from "multer";
import { Request } from "express";
import { supabase } from "../config/supabase";

export const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB in bytes

// Using memory storage instead of disk storage
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("LIMIT_UNEXPECTED_FILE"));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: fileFilter,
}).single("image");

export const uploadToSupabase = async (
  file: Express.Multer.File
): Promise<string> => {
  const timestamp = Date.now();
  const fileExtension = file.originalname.split(".").pop();
  const fileName = `${timestamp}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
    });

  console.log("data", data);
  if (error) throw error;

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(fileName);

  console.log("publicUrl", publicUrl);

  return publicUrl;
};
