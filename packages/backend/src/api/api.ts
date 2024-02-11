import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { dbDecorator } from "src/api/decorators/db-decorator";
import { userRoutes } from "src/api/routes/users";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { users } from "src/persistence/schema";
import { eq } from "drizzle-orm";
import { db } from "src/persistence/persistence";
import { pbkdf2, timingSafeEqual } from "node:crypto";

const server = Fastify({ logger: true });

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

passport.use(
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

          if (!timingSafeEqual(user.password, hashedPassword)) {
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
  .register(async (instance, options) => {
    dbDecorator(instance, options);
    server.register(userRoutes);
  });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
