import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/login", async (req, res) => {
    return;
  });
}
