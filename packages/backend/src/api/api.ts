import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";
import { dbDecorator } from "src/api/decorators/db-decorator";
import { userRoutes } from "src/api/routes/users";

const server = Fastify({ logger: true });

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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
