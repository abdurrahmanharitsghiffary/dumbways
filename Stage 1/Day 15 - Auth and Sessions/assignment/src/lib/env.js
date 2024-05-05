process.loadEnvFile(".env");

export const getEnv = (key) => process?.env?.[key];
