import type { EquidistantRequest } from './requestObjects'
import type { EquidistantResponse } from './responseTypes'

async function makeRequest (request: EquidistantRequest): Promise<EquidistantResponse> {
  const response = await fetch(request.path, request)
  const json = await response.json()
  return json
}

// TODO: If we don't add anything else update file name to makeRequest and make this:
// export default async function makeRequest
export { makeRequest }
