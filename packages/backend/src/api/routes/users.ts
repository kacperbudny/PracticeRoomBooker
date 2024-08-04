import { FastifyPluginAsync } from "fastify";
import z from "zod";
import passport from "passport";

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(1).max(100),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    passport.authenticate("local", {
      failureMessage: "failed",
      successMessage: "hurray",
    }),
  );
};
