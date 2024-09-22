import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { hash } from "bcrypt";
import { User } from "src/domain/user.entity";

export const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    "/",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(1).max(100),
          role: z.enum(["user", "admin"]),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    // TODO: GUARD THIS!
    async (req, res) => {
      const { email, password, role } = req.body;
      const { userRepository } = fastify.dependencies;

      const existingUser = await userRepository.getUserByEmail(email);

      if (existingUser) {
        // TODO: Better error handling
        throw new Error("User already exists");
      }

      const hashedPassword = await hash(password, 10);

      const newUser = User.create({
        email,
        password: hashedPassword,
        role,
      });
      await userRepository.createUser(newUser);

      // TODO: fix this
      return res.status(201).send();
    },
  );
};
