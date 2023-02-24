import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main () {
  if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCKS_ENABLED === 'true') {
    if (window.location.pathname === '/equidistant') {
      window.location.pathname = '/equidistant/'
      return
    }
    const { worker } = require('./mocks/browser')
    await worker.start({
      serviceWorker: {
        url: '/equidistant/mockServiceWorker.js'
      }
    })
  }
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <HashRouter basename='/'>
        <App />
      </HashRouter>
    </React.StrictMode>
  )
}

void main()

// if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCKS_ENABLED === 'true') {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const { worker } = require('./mocks/browser')
//   worker.start({
//     serviceWorker: {
//       url: '/equidistant/mockServiceWorker.js'
//     }
//   })
// }

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// )
// root.render(
//   <React.StrictMode>
//     <HashRouter basename='/'>
//       <App />
//     </HashRouter>
//   </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
