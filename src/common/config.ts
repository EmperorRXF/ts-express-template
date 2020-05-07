export const config = {
  environment: process.env.NODE_ENV,
  serviceId: process.env.SERVICE_ID,

  port: parseInt(process.env.PORT),

  isDev: function () {
    return this.environment === 'dev';
  },
};

export type Config = typeof config;
