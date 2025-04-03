import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";

const PROJECT_ROOT = path.resolve(process.cwd());
const REACT_BUILD_PATH = path.join(PROJECT_ROOT, 'build', 'react');

const app = express();

app.use(cors({ origin: true }));
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/chat', express.static(REACT_BUILD_PATH));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/chat');
});

app.get("/chat", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(REACT_BUILD_PATH, 'index.html'));
});

app.get("/chat/*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(REACT_BUILD_PATH, 'index.html'));
});

const handleListening = (): void => 
  console.log(`✅ Listening on: http://localhost:3000/chat`);

app.listen(3000, handleListening);

export default app; 