import { db } from "src/persistence/persistence";

declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
  }
}
