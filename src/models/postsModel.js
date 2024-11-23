import databaseConnect from "../config/dbConfig.js";

const connection = await databaseConnect(process.env.DB_CONNECTION_STRING);

export async function getAllPosts(){
  const db = connection.db("imersao_instabytes");
  const collection = db.collection("posts");
  return collection.find().toArray();
}

export async function createPost(newPost){
  const db = connection.db("imersao_instabytes");
  const collection = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne({_id: new ObjectId(objID)}, {$set: newPost});
}

export async function updatePost(id, newPost){
  const db = connection.db("imersao_instabytes");
  const collection = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne({_id: new ObjectId(objID)}, {$set: newPost});
}
