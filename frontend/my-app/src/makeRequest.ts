import type { EquidistantRequest } from './requestObjects'
import type { EquidistantResponse } from './responseTypes'

export default async function makeRequest (request: EquidistantRequest): Promise<EquidistantResponse> {
  const response = await fetch(request.path, request)
  const json = JSON.parse(snakeCaseToCamelCase(await response.text()))
  return json
}

function snakeCaseToCamelCase (input: string): string {
  input
    .split('_')
    .reduce(
      (res, word, i) =>
        i === 0
          ? word.toLowerCase()
          : `${res}${word.charAt(0).toUpperCase()}${word
              .substr(1)
              .toLowerCase()}`,
      ''
    )
  return input
}
