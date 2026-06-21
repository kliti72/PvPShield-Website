
const  IS_PROD = false;

export const env = {
  
  IS_DEV: !IS_PROD,

  SERVER: {
    PORT:     3000,
    HOSTNAME: IS_PROD ? '0.0.0.0' : '127.0.0.1',
  },

  DATABASE: {
    PATH: './config/database/app.db',
  },

  
}