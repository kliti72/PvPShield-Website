import { Elysia } from 'elysia'
import { loadRoutes } from './src/core/loader'
import { routes } from './app/routes'
import { env } from './config/environment/env'

const app = new Elysia();
  
loadRoutes(app, routes)

app.listen({
  port: env.SERVER.PORT,
  hostname: env.SERVER.HOSTNAME,
})
