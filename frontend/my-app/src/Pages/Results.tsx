import React, { useState } from 'react'
import './Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from '../responseTypes'
import { Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'

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
        <Stack>
        <Typography
          variant="h3"
          component="h2">
            Results
        </Typography>
        <Box>
          <Typography
            variant="h5"
            component="h2">
              Current location: {result.name}
          </Typography>
        </Box>
        <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          display: 'flex',
          flexWarp: 'wrap',
          m: 'auto'
        }}>
        <Button
        color='secondary'
        variant='contained'
        onClick={handleNextClick}
        sx={{
          display: 'flex',
          flexWarp: 'wrap',
          mr: 3,
          borderRadius: 28
        }}
        >
          Next
      </Button>
      <Button
      color='secondary'
      variant='contained'
      onClick={handleDoneClick}
      sx={{
        display: 'flex',
        flexWarp: 'wrap',
        mr: 3,
        borderRadius: 28
      }}
      >
        Done
    </Button>
        </Stack>
    </Stack>
  )
}

export default Results
