import { createLogger, format, Logger, transports } from 'winston';

export const getLogger = (context: string): Logger => {
  return createLogger({
    format: format.combine(
      format.timestamp(),
      format.splat(),
      format.json(),
      format.prettyPrint({ colorize: true, depth: 10 }),
    ),
    defaultMeta: { context },
    transports: [new transports.Console()],
  });
};
