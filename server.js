import fastifyStatic from "@fastify/static";
// import "dotenv/config";
import fastifyModule from "fastify";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = fastifyModule({ logger: false });

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
});

fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile("index.html");
});

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: "0.0.0.0",
    });
    console.log(`Server is running on port 3000, http://localhost:3000`);
    fastify.log.info(`Server is running on port 3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
