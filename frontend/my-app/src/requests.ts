import type { EquidistantRequest } from "./requestObjects"
import { EquidistantResponse } from "./responseTypes"
export { makeRequest }

async function makeRequest (request: EquidistantRequest): Promise<EquidistantResponse> {
  const response = await fetch(request.path, request)
  const json = await response.json()
  return json
}
