import { FastifyPluginAsync } from "fastify";

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/login", { schema: {} }, async (req, res) => {
    console.log(fastify.db);
    return;
  });
};
