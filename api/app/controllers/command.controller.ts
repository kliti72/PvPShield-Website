import { Elysia, t } from 'elysia'
import { commandRepository } from '../repositories/command.repository'
import type { Command } from '../types/command.type'

export const commandsController = new Elysia({ prefix: '/command' })

  .get('/', () => {
    return commandRepository.findAll()
  })

  .post('/', ( { body }) => {
    
    let command : Command = {
      command: body.command,
      executed: false,
    }

    return commandRepository.put(command);
  }, {
    body: t.Object({
      command: t.String()
    })
  })