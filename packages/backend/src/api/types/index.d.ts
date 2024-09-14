import { db } from "src/persistence";
import { UserRepository } from "src/persistence/repositories/user.repository";

declare module "fastify" {
  interface FastifyInstance {
    dependencies: { userRepository: UserRepository };
  }
}
