import { Request, Response, NextFunction } from "express";
import { MAX_FILE_SIZE, upload, uploadToSupabase } from "../utils/uploadFile";

export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.message === "File too large") {
        return res.status(400).json({
          error: `File size too large. Maximum size is ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB`,
        });
      }
      if (err.message === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          error: "Please upload only image files (jpg, png, gif, etc)",
        });
      }
      return res.status(400).json({
        error: err.message || "File upload error",
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageUrl = await uploadToSupabase(req.file);
      req.body.image = imageUrl; // Add the image d to the request body
      next();
    } catch (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ error: "Error uploading to Supabase" });
    }
  });
};
