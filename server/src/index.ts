import { env } from "./config/env.config.js";
import { server } from "./app.js";
import chalk from "chalk";

try {
    server.listen(env.app.port, (): void => {
        const serverLink = `http://localhost:${env.app.port}`;
        console.log(
            chalk.green(`Connected successfully - server is running on ${chalk.bold(serverLink)}`)
        );
        console.log(
            chalk.cyan(
                `API is running on ${chalk.bold(`${serverLink}/${env.app.routePrefix}`)} in [${
                    env.environment
                }]`
            )
        );
    });
} catch (error: any) {
    console.error(chalk.red(`Error occurred: ${error.message}`));
}
