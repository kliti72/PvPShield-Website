// core/loader.ts
import type { Elysia } from 'elysia'
import { env } from '../../config/environment/env'

// ─── ANSI Colors ──────────────────────────────────────────────────────────────

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
}

const ok = (s: string) => `${c.green} - ${c.reset} ${s}`
const skip = (s: string) => `${c.yellow}⊘${c.reset} ${c.dim}${s}${c.reset}`
const mw = (s: string) => `${c.magenta}⇢${c.reset} ${c.dim}middleware:${c.reset} ${c.magenta}${s}${c.reset}`
const line = () => console.log(`\n`)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RouteConfig {
  controller: Elysia<any, any, any, any, any, any>
  enabled: boolean
  middleware?: Elysia<any, any, any, any, any, any>[]
}

// ─── Loader ───────────────────────────────────────────────────────────────────

export function loadRoutes(app: Elysia, routes: RouteConfig[]): void {
  const active = routes.filter(r => r.enabled)
  const skipped = routes.filter(r => !r.enabled)

  console.log()
  console.log(`${c.bold}${c.cyan}  Elysia framework${c.reset} `)
  line()

  for (const route of active) {
    let ctrl = route.controller
    const name = (ctrl as any).config?.prefix ?? '/'

    if (route.middleware?.length) {
      for (const middlewareItem of route.middleware) {
        const mwName = (middlewareItem as any).config?.name ?? 'anonymous'
        console.log(`  ${mw(mwName)}  ${c.gray}→ ${name}${c.reset}`)
        ctrl = ctrl.use(middlewareItem) as typeof ctrl
      }
    }

    app.use(ctrl)
    console.log(`  ${ok(`${c.bold}${name}${c.reset}`)}  ${c.gray}controller mounted${c.reset}`)
  }

  if (skipped.length > 0) {
    for (const route of skipped) {
      const name = (route.controller as any).config?.prefix ?? '/'
      console.log(`  ${skip(name)}  disabled`)
    }
  }

  line()
  console.log(
    `  ${c.green}${c.bold}${active.length} route${c.reset}${c.green} attive da ./app/routes.ts${c.reset} \n` +
    `  ${c.green}${c.bold}${env.SERVER.HOSTNAME}:${env.SERVER.PORT} ${c.reset}` +
    (skipped.length > 0 ? `  ${c.gray}(${skipped.length} disabilitate)${c.reset}` : '' )
  )
  console.log()
}