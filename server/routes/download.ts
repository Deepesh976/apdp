import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const router = Router();

/**
 * Recursively search for a file inside a directory
 */
function findFileRecursive(dir: string, fileName: string): string | null {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const found = findFileRecursive(fullPath, fileName);
      if (found) return found;
    } else if (item === fileName) {
      return fullPath;
    }
  }

  return null;
}

/**
 * GET /api/download?type=pdf|brochure&file=filename.pdf
 */
router.get("/", (req: Request, res: Response) => {
  try {
    const { type, file } = req.query;

    if (!type || !file) {
      return res.status(400).json({ error: "Missing type or file" });
    }

    const safeFileName = path.basename(String(file));

    // ✅ ROOT PUBLIC FOLDERS
    const baseDir =
      type === "pdf"
        ? path.join(process.cwd(), "client/public/pdfs")
        : path.join(process.cwd(), "client/public/brochures");

    if (!fs.existsSync(baseDir)) {
      console.error("❌ Base directory missing:", baseDir);
      return res.status(500).json({ error: "Download directory missing" });
    }

    // 🔍 Search recursively
    const foundPath = findFileRecursive(baseDir, safeFileName);

    if (!foundPath) {
      console.error("❌ File not found:", safeFileName);
      return res.status(404).json({ error: "File not found" });
    }

    console.log("✅ Downloading:", foundPath);
    return res.download(foundPath);
  } catch (err) {
    console.error("❌ Download error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
