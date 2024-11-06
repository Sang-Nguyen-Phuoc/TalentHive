import {Request, Response } from "express";

type AsyncFunction = (req: Request, res: Response, next?: any) => any;

export default function catchAsync(fn: AsyncFunction) {
    return (req: Request, res: Response, next: any) => {
        fn(req, res, next).catch(next);
    }
}