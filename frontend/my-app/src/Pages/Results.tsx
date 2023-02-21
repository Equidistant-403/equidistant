import React, { useState } from 'react'
import './Results.css'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Location } from '../responseTypes'
import { Button, Typography, Paper, Rating } from '@mui/material'
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
    <div style={{ height: '90vh', margin: 0, padding: 0 }}>
      <Stack // page stack
        direction="column"
        height="100%"
        alignItems="center"
        justifyContent="center"
        spacing={2}>
        <Typography
          variant="h1"
          component="h2"
          sx={{
            py: 5,
            mx: 'auto'
          }}>
            Results
        </Typography>
          <Stack // result card
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
              height: '600px',
              px: 1,
              pb: 2
            }}>
              <Paper
                sx={{
                  mt: 3,
                  width: '550px',
                  height: '344px',
                  // TODO: get image of restaurant instad of placeholder. Image could be photo or google maps static map
                  backgroundImage: 'url("https://www.richaven.com/wp-content/uploads/2012/10/uw-ee-cse-11.jpg")',
                  borderRadius: '10px',
                  backgroundSize: 'cover',
                  border: 2
                }}>
                <Stack
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    display: 'flex',
                    flexWarp: 'wrap'
                  }}>
                  <Paper
                    sx={{
                      mt: 2,
                      mx: 2,
                      p: 2,
                      borderRadius: '10px',
                      border: 2
                    }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      textAlign="center">
                      {result.name}
                    </Typography>
                  </Paper>
                </Stack>
              </Paper>
              <Typography // TODO: get description of restaurant, can omit
                  variant="body1"
                  textAlign="center"
                  color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                </Typography>
              <Paper
                sx={{
                  mt: 2,
                  mx: 2,
                  p: 2,
                  borderRadius: '10px',
                  backgroundColor: 'success.main'
                }}>
                <Typography
                  variant="h6"
                  component="h2"
                  textAlign="center">
                  Average Travel Time: {result.travelTimes.reduce((a, b) => a + b, 0) / result.travelTimes.length}
                </Typography>
              </Paper>
              <Rating
                name="read-only"
                size="large"
                value={result.rating} readOnly
                sx={{
                  backgroundColor: 'rgba(52, 52, 52, 0.05)',
                  borderColor: 'secondary.main',
                  border: 3,
                  borderRadius: '10px'
                }}/>
          </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
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
          size='large'
          sx={{
            display: 'flex',
            flexWarp: 'wrap',
            mr: 3,
            p: 3,
            px: 10,
            borderRadius: 28
          }}>
            Next
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={handleDoneClick}
            size='large'
            sx={{
              display: 'flex',
              flexWarp: 'wrap',
              mr: 3,
              p: 3,
              px: 10,
              borderRadius: 28
            }}>
            Done
          </Button>
        </Stack>
      </Stack>
    </div>

  )
}

export default Results
