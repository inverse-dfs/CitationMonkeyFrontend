import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider/Divider'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FlakyIcon from '@mui/icons-material/Flaky'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'

const defaultTheme = createTheme()

export function EloBattle() {
    const [fightStage, setStage] = React.useState(0)
    const [author0, setAuthor0] = React.useState(null)
    const [author1, setAuthor1] = React.useState(null)
    const [leaderboard, setLeaderboard] = React.useState([])

    const getAuthors = () => {
        setLeaderboard([])
        axios.get("http://54.242.252.72/challenge").then(function (response) {
            console.log(response)

            if (response.data.length === 2) {
                setAuthor0(response.data[0])
                setAuthor1(response.data[1])
                setStage(1)
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const submitBattleResult = (authorWinner) => {
        var payload = null
        if (authorWinner === 0) {
            payload = { winner: author0[0], loser: author1[0] }
        } else {
            payload = { winner: author1[0], loser: author0[0] }
        }
        axios.post("http://54.242.252.72/result", payload).then(function (response) {
            console.log(response)
            setAuthor0(null)
            setAuthor1(null)
            setStage(0)
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    const getLeaderBoard = () => {
        if (leaderboard.length === 0) {
            axios.get("http://54.242.252.72/leaderboard").then(function (response) {
            console.log(response)
            setLeaderboard(response.data)
        })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            setLeaderboard([])
        }
        
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <FlakyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Elo Battle
                    </Typography>
                    {fightStage === 0 ?
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box component="form" noValidate sx={{ mt: 3 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => { getAuthors() }}
                                        >
                                            Get authors for battle!
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box component="form" noValidate sx={{ mt: 3 }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => { getLeaderBoard() }}
                                        >
                                            See elo leaderboard!
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            {leaderboard.length !== 0 &&
                                leaderboard.map((author) => {
                                    return (
                                        <Box
                                            sx={{
                                                width: '100%',
                                                mb: 1,
                                            }}
                                        >
                                            <Typography>
                                                <strong>{author[1]}: </strong> {author[2]}
                                            </Typography>
                                            <Divider sx={{ ml: '15px', borderBottomWidth: 2, background: 'black' }} />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        :
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => { submitBattleResult(0) }}
                                >
                                    Vote {author0[1]} ({author0[2]})
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => { submitBattleResult(1) }}
                                >
                                    Vote {author1[1]} ({author1[2]})
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </Box>

            </Container>
        </ThemeProvider>
    )
}