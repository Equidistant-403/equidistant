import React from 'react'
import './Results.css'
import { useNavigate } from 'react-router-dom'

const Results: React.FC = () => {
  const navigate = useNavigate()

  const handleNextClick = (): void => {
    console.log('dummy next result actuation')
  }

  const handleDoneClick = (): void => {
    console.log('dummy results done actuation')
    navigate('/landing')
  }

  return (
        <div className="container">
        <h1>Results</h1>
        <div className="buttons">
            <button onClick={handleNextClick}>Next</button>
            <button onClick={handleDoneClick} className="right">Done</button>
        </div>
        </div>
  )
}

export default Results
