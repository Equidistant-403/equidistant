import React, { useState } from 'react'
import './Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from '../responseTypes'

const Results: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const results = location.state.locations
  const [index, setIndex] = useState<number>(0)
  const [result, setResult] = useState<Location>(results[0])

  const handleNextClick = (): void => {
    if (index < results.length - 1) {
      setResult(results[index + 1])
      setIndex(index + 1)
    } else {
      // TODO: Display out of options or make another query to backend for more
    }
  }

  const handleDoneClick = (): void => {
    console.log('dummy results done actuation')
    navigate(-1)
  }

  return (
        <div className="container">
        <h1>Results</h1>
        <div className="location">
          <p>Current location: {result.name}</p>
        </div>
        <div className="buttons">
            <button onClick={handleNextClick}>Next</button>
            <button onClick={handleDoneClick} className="right">Done</button>
        </div>
        </div>
  )
}

export default Results
