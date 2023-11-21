import Fastify from "fastify";
import { userRoutes } from "src/api/routes/users";

const server = Fastify({ logger: true });

server.register(userRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
