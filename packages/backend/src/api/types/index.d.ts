import { db } from "src/persistence";

declare module "fastify" {
  interface FastifyInstance {
    db: typeof db;
  }
}
