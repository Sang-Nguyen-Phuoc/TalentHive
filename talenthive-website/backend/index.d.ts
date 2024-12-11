import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: "candidate" | "employer" | "admin" | string;
            };
        }
    }
}
