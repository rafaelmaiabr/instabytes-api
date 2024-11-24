import express from "express";
import multer from "multer";
import { getPosts, postNewPost, uploadImage, updateNewPost } from "../controllers/postController.js";
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
const upload = multer({ storage: storage });

const routes = (app) => {
  
  app.use(express.json());
  app.use(cors(corsOptions));
  
  app.get("/posts", getPosts);
  app.post("/posts", postNewPost);
  app.post("/upload", upload.single("image"), uploadImage);
  app.put("/upload/:id", updateNewPost);
}

export default routes;
