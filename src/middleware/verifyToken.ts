import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();

const TOKEN_KEY = process.env.TOKEN || "your-secret-key";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Espera o formato "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }
  if(token !== TOKEN_KEY){
    res.status(403).json({ message: "Token inválido ou expirado" });
    return
  }
    next(); // Continua para a próxima função
};
