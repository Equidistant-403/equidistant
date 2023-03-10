import type { EquidistantRequest } from './requestObjects'
import type { EquidistantResponse } from './responseTypes'

/**
 * Executes the given request against the backend API
 * @param request the request to execute
 * @returns the response from the server. Could be an ErrorResponse
 */
export default async function makeRequest (request: EquidistantRequest): Promise<EquidistantResponse> {
  const response = await fetch(request.path, request)
  const json = keysToCamel(await response.json())
  return (json as EquidistantResponse)
}

/**
 * Turns the given object (parsed from json) from snake_cased fields to camelCased ones
 * @param obj the object to convert fields
 * @returns and object with converted fields
 */
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

/**
 * Returns whether or not the given parameter is an object
 * @param obj the value to check
 * @returns if the value is an object
 */
function isObject (obj: any): boolean {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

/**
 * Converts the given string from snake_case to camelCase
 * @param str the string to convert
 * @returns the converted, camelCased string
 */
function toCamel (str: string): string {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}
