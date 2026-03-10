import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withBase(path: string, base = import.meta.env.BASE_URL) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (!normalizedBase) {
    return normalizedPath
  }

  if (normalizedPath === normalizedBase || normalizedPath.startsWith(`${normalizedBase}/`)) {
    return normalizedPath
  }

  if (normalizedPath === '/') {
    return normalizedBase
  }

  return `${normalizedBase}${normalizedPath}`
}

export function stripBase(pathname: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '')

  if (!normalizedBase) {
    return pathname || '/'
  }

  if (pathname === normalizedBase) {
    return '/'
  }

  if (pathname.startsWith(`${normalizedBase}/`)) {
    return pathname.slice(normalizedBase.length)
  }

  return pathname || '/'
}
