import databaseConnect from "../config/dbConfig.js";

const connection = await databaseConnect(process.env.DB_CONNECTION_STRING);

export default async function getAllPosts(){
  const db = connection.db("imersao_instabytes");
  const collection = db.collection("posts");
  return collection.find().toArray();
}