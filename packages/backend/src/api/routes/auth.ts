import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import fastifyPassport from "@fastify/passport";

export const authRoutes: FastifyPluginAsyncZod = async (fastify) => {
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
    fastifyPassport.authenticate("local", {
      failureMessage: "failed",
      successMessage: "hurray",
    }),
  );
};
