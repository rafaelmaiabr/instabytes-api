import {getAllPosts, createPost, updatePost} from "../models/postsModel.js";
import fs from "fs";
import createDescriptionByGemini from "../services/geminiService.js";

export async function getPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function postNewPost(req, res) {
  const newPost = req.body;
  try {
    const postCreated = await createPost(newPost);
    res.status(200).json(postCreated);
  } catch (error) {
    console.error(`Erro ao criar Post: ${error.message}`);
    res.status(500).json({"error":"Error creating post"});
  }
}

export async function uploadImage(req, res) {
  const newPost = {
    description: "",
    imageUrl: req.file.originalname,
    alt: ""
  };

  try {
    const postCreated = await createPost(newPost);
    const imageUpdated = `uploads/${postCreated.insertedId}.png`
    fs.renameSync(req.file.path, imageUpdated);
    res.status(200).json(postCreated);
  } catch(error) {
    console.error(`Erro ao criar Post: ${error.message}`);
    res.status(500).json({"error":"Error creating post"});
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await createDescriptionByGemini(imgBuffer);

    const post = {
      imageUrl: urlImage,
      description: description,
      alt: req.body.alt
    }

    const postCreated = await updatePost(id, post);
    res.status(200).json(postCreated);
  } catch (error) {
    console.error(`Erro ao criar Post: ${error.message}`);
    res.status(500).json({ "error": "Error creating post" });
  }
}