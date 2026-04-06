type EnvValue = string | undefined;

function readEnv(name: string): EnvValue {
  return process.env[name];
}

export function getRequiredEnv(name: string): string {
  const value = readEnv(name);
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getOptionalEnv(name: string, fallback = ""): string {
  const value = readEnv(name);
  if (!value || value.trim() === "") return fallback;
  return value;
}

export function assertSecurityEnv() {
  // Keep required vars narrow so local development can still boot.
  // These are the minimum values for secure API operations.
  getRequiredEnv("JWT_SECRET");
  getRequiredEnv("MONGODB_URI");
}

