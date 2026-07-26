import { createClient } from "@supabase/supabase-js";

const client = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

async function getAllUsers() {
  const { data, error } = await client.from("users").select();
  if (error) console.log(error);
  return data;
}

async function createUser(usernume, age) {
  const { data, error } = await client
    .from("users")
    .insert({ usernume, age })
    .select();
  if (error) console.log(error);
  return data;
}

async function getById(id) {
  const { data, error } = await client.from("users").select().eq("id", id);
  if (error) console.log(error);
  return data;
}

async function deleteById(id) {
  const { data, error } = await client
    .from("users")
    .delete()
    .eq("id", id)
    .select();
  if (error) console.log(error);
  return data;
}

async function updateById(id, usernume, age) {
  const { data, error } = await client
    .from("users")
    .update({ usernume, age })
    .eq("id", id)
    .select();
  if (error) console.log(error);
  return data;
}
