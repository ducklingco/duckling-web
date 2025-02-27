import { Surreal } from "surrealdb";
const dbClient = new Surreal();
const config = useRuntimeConfig();

export const getDBClient = () => {
  return dbClient;
};

export const createTestRecord = async () => {
  const client = getDBClient();
  await client.create("person", {
    first: "John",
    last: "Doe",
    marketing: true,
    tags: ["python", "documentation"],
  });
};

export const connectDBClient = async () => {
  return await dbClient.connect(config.campaignDBURL, {
    namespace: config.campaignDBNamespace,
    database: config.campaignDBDatabase,
    auth: {
      username: config.campaignDBUsername,
      password: config.campaignDBPassword,
    },
  });
};

connectDBClient();
