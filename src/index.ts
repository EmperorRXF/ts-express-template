import * as express from 'express';
import helmet = require('helmet');

import { config, getLogger } from './common';

const logger = getLogger('bootstrap');

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
