import getAllPosts from "../models/postsModel.js";

export { getAllPosts };

export async function fetchAllPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}
