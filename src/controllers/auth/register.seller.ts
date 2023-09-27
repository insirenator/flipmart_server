import { NextFunction, Request, Response } from "express";

export default async function registerSellerHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { jwtPayload } = res.locals;
    const { id } = req.body;

    if (jwtPayload.id !== id) {
      throw {
        status: 403,
        msg: "id mismatch: body id and token id do not match",
      };
    }

    return res.status(201).json({
      success: true,
      message: "registered as a seller",
    });
  } catch (error) {
    next(error);
  }
}
