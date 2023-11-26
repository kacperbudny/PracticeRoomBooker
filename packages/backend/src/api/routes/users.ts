import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/login", { schema: {} }, async (req, res) => {
    return;
  });
}
