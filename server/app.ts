import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors({ origin: true }));
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "react/build")));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "react/build/index.html"));
});

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "react/build/index.html"));
});

const handleListening = (): void => 
  console.log(`✅Listening on: http://localhost:3000`);

app.listen(3000, handleListening);

export default app; 