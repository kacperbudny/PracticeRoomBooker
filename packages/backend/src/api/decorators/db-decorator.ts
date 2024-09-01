import { FastifyPluginAsync } from "fastify";
import { db } from "src/persistence";
import { UserRepository } from "src/persistence/repositories/user.repository";

export const dependenciesDecorator: FastifyPluginAsync = async (fastify) => {
  const userRepository = new UserRepository(db);

  fastify.decorate("dependencies", { userRepository });
};
