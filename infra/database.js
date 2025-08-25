import { Client } from "pg";

async function query(queryObject) {
  const clientOptions = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  };

  const client = new Client(clientOptions);
  console.log("Credenciais: ", clientOptions);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
