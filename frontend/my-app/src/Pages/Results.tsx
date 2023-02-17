import React, { useState } from 'react'
import './Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from '../responseTypes'
import { Button, Typography, Paper } from '@mui/material'
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
    <Stack
      direction="column"
      height="100%"
      alignItems="center"
      justifyContent="space-evenly"
      spacing={2}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          py: 5,
          mx: 'auto'
        }}>
          Results
      </Typography>
        <Stack // results
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            display: 'flex',
            flexWarp: 'wrap',
            backgroundColor: 'secondary.main',
            mt: 10,
            borderRadius: '40px',
            width: '600px',
            height: '600px'
          }}>
          <Stack>
            <Typography // times
              variant="h3"
              component="h2"
              sx={{
                py: 5,
                mx: 'auto'
              }}>
                Results
            </Typography>
          </Stack>
          <Stack // card
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{
              display: 'flex',
              flexWarp: 'wrap',
              backgroundColor: 'primary.main',
              mt: 10,
              borderRadius: '40px',
              width: '600px',
              height: '600px'
            }}>
              <Paper
                sx={{
                  mt: 3,
                  width: '550px',
                  height: '380px',
                  backgroundColor: 'primary.main',
                  borderRadius: '10px'
                }}>
                <Paper
                  sx={{
                    mt: 2,
                    mx: 2,
                    p: 2,
                    borderRadius: '10px'
                  }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    textAlign="center">
                    {result.name}
                  </Typography>
                </Paper>
              </Paper>
          </Stack>
        </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          display: 'flex',
          flexWarp: 'wrap',
          alignItems: ''
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
        }}>
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
          }}>
          Done
        </Button>
      </Stack>
    </Stack>
  )
}

export default Results
