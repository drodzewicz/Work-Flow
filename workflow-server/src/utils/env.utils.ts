export function getEnv(key: string, required: boolean = false, defaultValue: string = ""): string {
  if (required && typeof process.env[key] === "undefined") {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return (process.env[key] as string) ?? defaultValue;
}

export function toNumber(value: string): number {
  return parseInt(value, 10);
}

export function toBool(value: string): boolean {
  return value === "true";
}
