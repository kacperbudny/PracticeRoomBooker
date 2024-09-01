import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { dependenciesDecorator } from "src/api/decorators/db-decorator";
import { userRoutes } from "src/api/routes/users";
import { Strategy as LocalStrategy } from "passport-local";
import { users } from "src/persistence/schemas/user.schema";
import { eq } from "drizzle-orm";
import { db } from "src/persistence";
import { pbkdf2, timingSafeEqual } from "node:crypto";
import cors from "@fastify/cors";
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import { config } from "src/config";
import { authRoutes } from "src/api/routes/auth";

const server = Fastify({ logger: true });

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySecureSession, {
  key: config.session.secretKey,
  cookie: {
    httpOnly: true,
    secure: config.environment !== "local",
    sameSite: "Lax",
  },
});
server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

fastifyPassport.use(
  new LocalStrategy(async (email, password, cb) => {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!result.length) {
        return cb(null, false, { message: "Invalid credentials." });
      }

      const user = result[0];

      pbkdf2(
        password,
        "test1234",
        310000,
        32,
        "sha256",
        (err, hashedPassword) => {
          if (err) {
            throw err;
          }

          if (!timingSafeEqual(Buffer.from(user.password), hashedPassword)) {
            return cb(null, false, { message: "Invalid credentials." });
          }

          return cb(null, user);
        },
      );
    } catch (error) {
      return cb(error);
    }
  }),
);

server
  .withTypeProvider<ZodTypeProvider>()
  .register(cors)
  .register(async (instance, options) => {
    dependenciesDecorator(instance, options);
    server.register(authRoutes, { prefix: "/auth" });
    server.register(userRoutes, { prefix: "/users" });
  });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
