import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import type { EquidistantRequest } from './requestObjects'
import { LoginRequest } from './requestObjects'
import type { LoginResponse } from './responseTypes'

async function makeRequest (request: EquidistantRequest): Promise<LoginResponse> {
  const response = await fetch(request.path, request)
  const json = await response.json()
  return json
}

function App (): React.ReactElement {
  useEffect(() => {
    makeRequest(new LoginRequest('user', 'password'))
      .then(res => {
        console.log(res.listOfFriends)
      })
      .catch((e) => { console.error(e) })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
