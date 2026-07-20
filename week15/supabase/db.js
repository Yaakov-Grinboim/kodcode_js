import { createClient } from "@supabase/supabase-js";

const client = createClient(process.env.SUPABASE_URL, process.env.API_KEY);

async function createAuthors(firstname, lastname, email){
const {data, error} = await client.from("authors").insert({firstname, lastname, email}).select().single();
console.log(data);

}

async function getAllAuthors() {
  const { data, error } = await client.from("authors").select();
  if (error) return console.log(error);
  console.log(data);
  return data;
}

export { client, getAllAuthors, createAuthors };

