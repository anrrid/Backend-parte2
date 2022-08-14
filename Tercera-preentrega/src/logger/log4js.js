import { configure, getLogger } from "log4js";

configure({
  appenders: {
    logConsole: { type: "console" },
    logErrorFile: { type: "file", filename: "error.log" },
    logWarnFile: { type: "file", filename: "warn.log" },
  },
  categories: {
    default: { appenders: ["logConsole"], level: "info" },
    myError: { appenders: ["logErrorFile", "logConsole"], level: "error" },
    myWarn: { appenders: ["logWarnFile", "logConsole"], level: "warn" },
    myTrace: { appenders: ["logConsole"], level: "trace" },
  },
});

const loggers = {
  loggerDefault: getLogger(),
  loggerError: getLogger('myError'),
  loggerWarn: getLogger('myWarn'),
  loggerTrace: getLogger('myTrace'),
}

export default loggers;

