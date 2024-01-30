import dotenv from "dotenv";

dotenv.config();

export const BCYPT_SPACE = parseInt(process.env.SALTOS ?? "10");
