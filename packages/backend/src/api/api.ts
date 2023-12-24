import Fastify from "fastify";
import { dbDecorator } from "src/api/decorators/db-decorator";
import { userRoutes } from "src/api/routes/users";

const server = Fastify({ logger: true });

server.register(async (instance, options) => {
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
