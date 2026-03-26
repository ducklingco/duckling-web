import { Surreal } from "surrealdb";
const dbClient = new Surreal();
const config = useRuntimeConfig();

export const getDBClient = () => {
  return dbClient;
};

export const connectDBClient = async () => {
  const dbUrl = config.campaignDbUrl;

  if (!dbUrl) {
    console.error("Missing or invalid database URL:", dbUrl);
    throw new Error("Database URL is not configured properly");
  }

  try {
    await dbClient.connect(dbUrl);

    return await dbClient.signin({
      database: config.campaignDbDatabase,
      namespace: config.campaignDbNamespace,
      username: config.campaignDbUsername,
      password: config.campaignDbPassword,
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
};

const isConnected = () => dbClient.status === "connected";

const checkDbConnection = async () => {
  setTimeout(async () => {
    if (!isConnected()) {
      await connectDBClient();
    }
    checkDbConnection();
  }, 5000);
};

export const checkConnectionAndReturnClient = async () => {
  if (!isConnected()) {
    await connectDBClient();
  }
  return dbClient;
};

connectDBClient().then(() => {
  setTimeout(() => {
    checkDbConnection();
  }, 20000);
});
