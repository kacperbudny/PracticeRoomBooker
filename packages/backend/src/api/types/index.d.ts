import { UserRepository } from "src/persistence/repositories/user.repository";

declare module "fastify" {
  interface FastifyInstance {
    dependencies: { userRepository: UserRepository };
  }

  interface PassportUser {
    id: string;
  }
}
