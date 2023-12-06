import { FastifyPluginAsync } from "fastify";
import { db } from "src/persistence/persistence";

export const dbDecorator: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("db", () => db);
};
