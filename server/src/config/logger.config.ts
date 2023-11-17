import morganLogger from "morgan";
import chalk from "chalk";

const getStatusColor = (status: number) => {
  if (status >= 100 && status < 200) {
    return chalk.white(status);
  } else if (status >= 200 && status < 300) {
    return chalk.green(status);
  } else if (status >= 300 && status < 400) {
    return chalk.blue(status);
  } else if (status >= 400 && status < 500) {
    return chalk.red(status);
  } else if (status >= 500 && status < 600) {
    return chalk.yellow(status);
  }
};

export const logger = morganLogger(function (tokens, req, res) {
  const colorLightBlue = "#80c3e0";
  const colorBlue = "#34ace0";

  return [
    chalk.hex(colorLightBlue).italic("@ " + tokens.date(req, res)),
    chalk.hex(colorBlue).bold("["),
    chalk.hex(colorBlue).bold(tokens.method(req, res)),
    getStatusColor(parseInt(tokens.status(req, res))),
    chalk.hex(colorBlue).bold("]"),
    chalk.hex(colorLightBlue)(tokens.url(req, res)),
    chalk.hex(colorBlue)(`(${tokens["response-time"](req, res)} ms)`),
    chalk.hex(colorLightBlue)(tokens["remote-addr"](req, res)),
  ].join(" ");
});
