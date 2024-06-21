import express, { Express } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./helper/appDataSource";
import authRoutes from "./routes/authRoutes";
import bookmarkRoutes from "./routes/bookmarkRoutes";
import githubRoutes from "./routes/githubRoutes";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', bookmarkRoutes);
app.use('/api/github', githubRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


