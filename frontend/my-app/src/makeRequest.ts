import type { EquidistantRequest } from './requestObjects'
import type { EquidistantResponse } from './responseTypes'

export default async function makeRequest (request: EquidistantRequest): Promise<EquidistantResponse> {
  const response = await fetch(request.path, request)
  const json = await response.json()
  return json
}
