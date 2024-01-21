import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { dbDecorator } from "src/api/decorators/db-decorator";
import { userRoutes } from "src/api/routes/users";
import passport from "passport";
import LocalStrategy from "passport-local";
import { users } from "src/persistence/schema";
import { eq } from "drizzle-orm";

const server = Fastify({ logger: true });

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server
  .withTypeProvider<ZodTypeProvider>()
  .register(async (instance, options) => {
    dbDecorator(instance, options);
    server.register(userRoutes);
  });

passport.use(
  new LocalStrategy(async (email, password, cb) => {
    const result = await db.select().from(users).where(eq(users.email, email));
  }),
);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
