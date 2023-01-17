import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import pino from "pino";
import dayjs from "dayjs"

const options: swaggerJsdoc.Options  = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NSChallenge',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};;

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}

  const log = pino( {
     colorize: true, ignore: 'hostname,pid' ,  timestamp: () => `,"time":"${dayjs().format()}"`
  } )

export default swaggerDocs;