import type { RouteConfig } from '../src/core/loader'
import { commandsController } from './controllers/command.controller'

import { playerController } from './controllers/users.controller' 

export const routes: RouteConfig[] = [
  {
    controller: commandsController,
    enabled: true,
    middleware: [],
  },


  {
    controller: playerController,
    enabled: true,
    middleware: [],
  },
]