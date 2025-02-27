import { Surreal } from "surrealdb";
const dbClient = new Surreal();
const config = useRuntimeConfig();

export const getDBClient = () => {
  return dbClient;
};

export const connectDBClient = async () => {
  const dbURL = config.campaignDBURL;

  if (!dbURL) {
    console.error("Missing or invalid database URL:", dbURL);
    throw new Error("Database URL is not configured properly");
  }

  console.log("Connecting to database at:", dbURL.replace(/:[^:]*@/, ":****@")); // Hide password in logs

  // At the top of your file
  console.log("Runtime config keys available:", Object.keys(config));
  console.log(
    "Runtime public config keys available:",
    Object.keys(config.public),
  );
  console.log("DB URL defined:", Boolean(config.campaignDBURL));
  try {
    return await dbClient.connect(dbURL, {
      namespace: config.campaignDBNamespace,
      database: config.campaignDBDatabase,
      auth: {
        username: config.campaignDBUsername,
        password: config.campaignDBPassword,
      },
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
};

const checkDbConnection = async () => {
  setTimeout(async () => {
    if (!dbClient.ready) {
      await connectDBClient();
    }
    checkDbConnection();
  }, 5000);
};

connectDBClient().then(() => {
  setTimeout(() => {
    checkDbConnection();
  }, 20000);
});
