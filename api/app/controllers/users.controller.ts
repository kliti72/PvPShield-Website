import { Elysia, t } from 'elysia'
import { playerRepository } from "../repositories/player.repository"

export const playerController = new Elysia({ prefix: '/player' })

  .get('/', () => {
    return playerRepository.findAll();
  })

  .get('/:id', ({ params }) => {
    return playerRepository.findById(Number(params.id))
  }, {
    params: t.Object({ id: t.Numeric() }),
  })

  .get('/:uuid', ({ params }) => {
    return playerRepository.findByUUID(params.uuid)
  }, {
    params: t.Object({ uuid: t.String() }),
  })

  .post('/', ({ body }) => {
    return playerRepository.insert(body)
  }, {
    body: t.Object({
      name: t.String(),
      uuid: t.String(),
    }),
  })

  .put('/:id', ({ params, body }) => {
    return playerRepository.update(Number(params.id), body)
  }, {
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      name: t.String(),
      uuid: t.String(),
    }),
  })

  .delete('/:id', ({ params }) => {
    return playerRepository.remove(Number(params.id))
  }, {
    params: t.Object({ id: t.Numeric() }),
  })
