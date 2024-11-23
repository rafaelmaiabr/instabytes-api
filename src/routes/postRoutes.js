import express from "express";
import multer from "multer";
import { getAllPosts, postNewPost, uploadImage, updatedNewPost } from "../controllers/postController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// rack para upload de arquivos no Windows
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Ambiente linux não precisa do rack "storage"
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  
  app.use(express.json());
  app.use(cors(corsOptions));
  
  app.get("/posts", getAllPosts);
  app.post("/posts", postNewPost);
  app.post("/upload", upload.single("image"), uploadImage);
  app.put("/upload/:id", updatedNewPost);
}

export default routes;
