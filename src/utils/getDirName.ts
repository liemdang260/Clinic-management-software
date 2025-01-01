import path from "path";
import { fileURLToPath } from "url";

export const getFileName = (fileUrl: string) => {
  fileURLToPath(fileUrl);
};

export const getDirName = (fileUrl: string) => {
  return path.dirname(fileURLToPath(fileUrl));
};
