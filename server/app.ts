import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";

// 프로젝트 루트 경로 얻기
const PROJECT_ROOT = path.resolve(process.cwd());
// 빌드된 React 앱 경로
const REACT_BUILD_PATH = path.join(PROJECT_ROOT, 'build', 'react');

const app = express();

app.use(cors({ origin: true }));
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(REACT_BUILD_PATH));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(REACT_BUILD_PATH, 'index.html'));
});

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(REACT_BUILD_PATH, 'index.html'));
});

const handleListening = (): void => 
  console.log(`✅ Listening on: http://localhost:3000`);

app.listen(3000, handleListening);

export default app; 