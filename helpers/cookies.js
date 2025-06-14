import cookie from 'cookie'
import jsCookie from 'js-cookie'

export function parseCookies(ctx = {}) {
  if (ctx.req && ctx.req.headers) {
    return cookie.parse(ctx.req.headers.cookie || '')
  }
  return jsCookie.get()
}

export function setCookie(ctx = {}, name, value, options = {}) {
  const opts = { path: '/', ...options }
  if (ctx.res) {
    const serialized = cookie.serialize(name, value, opts)
    const header = ctx.res.getHeader('Set-Cookie')
    if (Array.isArray(header)) {
      ctx.res.setHeader('Set-Cookie', [...header, serialized])
    } else if (header) {
      ctx.res.setHeader('Set-Cookie', [header, serialized])
    } else {
      ctx.res.setHeader('Set-Cookie', serialized)
    }
  } else {
    jsCookie.set(name, value, opts)
  }
}

export function destroyCookie(ctx = {}, name, options = {}) {
  setCookie(ctx, name, '', { ...options, maxAge: -1 })
}
