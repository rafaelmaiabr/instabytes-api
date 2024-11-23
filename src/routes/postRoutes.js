import express from "express";
import { getAllPosts } from "../controllers/postController.js";

const routes = (app) => {
  
  app.use(express.json());
  
  app.get("/posts", getAllPosts);
}

export default routes;
