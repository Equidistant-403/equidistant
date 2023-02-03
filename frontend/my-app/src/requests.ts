import * as https from 'https'
import { EquidistantRequest } from "./requestObjects"

export { makeRequest }

async function makeRequest(option: EquidistantRequest): Promise<void>  {
    return new Promise((resolve, reject) => {
        const req = https.request(option, (response) => {
            let data = ''
            
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                resolve(JSON.parse(data))
            });
        }).on("error", (error) => {
            reject(error)
        });

        req.end();
    }) 
}