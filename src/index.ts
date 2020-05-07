import * as express from 'express';
import helmet = require('helmet');
import { createLogger, format, transports } from 'winston';

import { config } from './common';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.json(),
    format.prettyPrint({ colorize: true, depth: 10 }),
  ),
  defaultMeta: { serviceId: config.serviceId },
  transports: [new transports.Console()],
});

async function bootstrap(): Promise<void> {
  const app = express().use(helmet());

  app.listen(config.port, () => {
    if (config.isDev()) {
      logger.info('Application Running', {
        url: `http://localhost:${config.port}`,
      });
    }
  });
}

bootstrap().catch((error) => {
  logger.error('An unhandled exception occured', {
    error,
  });
  process.exit();
});
