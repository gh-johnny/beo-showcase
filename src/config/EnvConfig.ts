import { z } from "zod";

class EnvConfig {
  private readonly schema = z.object({
    ENV: z.enum(["development", "production", "test"]).default("development"),
    BASE_URL: z.string().url().min(1).transform(String),
    PORT: z.string().regex(/^\d+$/, "PORT must be a number").transform(Number),
  });

  public readonly config: z.infer<typeof this.schema>;

  constructor() {
    const env = this.schema.safeParse(process.env);

    if (!env.success) {
      console.error("❌ Invalid environment variables: ", env.error.format());
      throw new Error("Environment variables validation failed.");
    }

    this.config = env.data;
  }

  get<T extends keyof z.infer<typeof this.schema>>(key: T): z.infer<typeof this.schema>[T] {
    const value = this.config[key];
    if (value === undefined) {
      throw new Error(`${key} is missing from environment variables`);
    }
    return value;
  }
}

export const envConfig = new EnvConfig();
