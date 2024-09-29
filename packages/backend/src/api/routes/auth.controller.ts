import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import fastifyPassport from "@fastify/passport";

export const authRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    "/login",
    {
      // preValidation: fastifyPassport.authenticate("local", {
      //   failureMessage: "failed",
      //   successMessage: "hurray",
      // }),
      schema: {
        body: z.object({
          username: z.string().email(),
          password: z.string().min(1).max(100),
        }),
        // response: {
        //   201: z.object({ token: z.string() }),
        // },
      },
    },
    fastifyPassport.authenticate("local"),
  );
};
