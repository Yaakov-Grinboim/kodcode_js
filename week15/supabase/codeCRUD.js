import { createClient } from "@supabase/supabase-js";

const client = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

async function getAllUsers() {
  const { data, error } = await client.from("movies").select();
  if (error) return console.log(error);
  return data;
}

async function createUser(username, age) {
  const { data, error } = await client
    .from("movies")
    .insert({ username, age })
    .select()
    .single();
  if (error) return console.log(error);
  return data;
}

async function getById(id) {
  const { data, error } = await client.from("movies").select().eq("id", id);
  if (error) return console.log(error);
  return data;
}
async function getByage(age) {
  const { data, error } = await client.from("movies").select().gte("age", age);
  if (error) return console.log(error);
  return data;
}
async function deleteById(id) {
  const { data, error } = await client
    .from("movies")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) return console.log(error);
  return data;
}

async function updateUser(id, newData) {
  const { data, error } = await client
    .from("movies")
    .update(newData)
    .eq("id", id)
    .select()
    .single();
  if (error) return console.log(error);
  return data;
}

export { createUser, deleteById, getAllUsers, getById, updateUser };
