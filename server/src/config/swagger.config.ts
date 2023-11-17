import { Application } from "express";
import { RoutingControllersOptions, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";
import { env } from "./env.config.js";

export const useSwagger = (app: Application, options: RoutingControllersOptions) => {
  if (!env.swagger.enabled) {
    return;
  }
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, options, {
    components: {
      securitySchemes: {
        basicAuth: {
          scheme: "basic",
          type: "http",
        },
      },
    },
    info: {
      title: "Work-Flow API",
      version: "2.0.0",
    },
  });

  app.use(`/${env.app.routePrefix}/docs`, swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
};
