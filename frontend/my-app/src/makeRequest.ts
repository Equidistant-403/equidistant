import type { EquidistantRequest } from './requestObjects'
import type { EquidistantResponse, ErrorResponse } from './responseTypes'

export default async function makeRequest (request: EquidistantRequest): Promise<EquidistantResponse> {
  console.log(request)
  const response = await fetch(request.path, request)
  if (response.ok) {
    const jsonCamel = keysToCamel(await response.json())
    return (jsonCamel as EquidistantResponse)
  } else {
    const error: ErrorResponse = { error: 'Server connection issue' }
    return error
  }
}

function keysToCamel (obj: any): any {
  if (isObject(obj)) {
    const n: object = {}

    Object.keys(obj)
      .forEach(k => {
        (n as any)[toCamel(k)] = keysToCamel(obj[k])
      })

    return n
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i)
    })
  }

  return obj
}

function isObject (obj: any): boolean {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

function toCamel (str: string): string {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}
