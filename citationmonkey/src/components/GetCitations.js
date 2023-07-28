import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider/Divider';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LinkIcon from '@mui/icons-material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';
import * as util from '../utilities'
import { BASE_URL } from '../types/url.ts'

const defaultTheme = createTheme()


export function GetCitations() {
    const [status, setStatus] = React.useState("");
    const [paperIdError, setPaperIdError] = React.useState("");

    const [data, setData] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const paper_id = data.get('paperid')
        setStatus('')
        setData(null)

        if (!paper_id) {
            setPaperIdError('Paper ID is required')
        } else {
            setPaperIdError('')
            axios.get(BASE_URL + "citations/" + paper_id).then(function (response) {
                console.log(response.data)
                setData(response.data)

                if (response.data.length === 0) {
                    setStatus('no results')
                } else {
                    setStatus('')
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
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
                        <LinkIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Find Linked Citations
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="paperid"
                                    name="paperid"
                                    required
                                    fullWidth
                                    id="paperid"
                                    label="Root Paper ID"
                                    autoFocus
                                    error={paperIdError ? true : false}
                                    helperText={paperIdError}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Find Linked Papers!
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {status &&
                        <Box
                            sx={{
                                color: "#FF0000",
                                textAlign: "center",
                            }}
                        >
                            <Typography>No Linked Citations for Paper</Typography>
                        </Box>
                    }
                    {data &&
                        data.map((id) => {
                            return (
                                <Box
                                    sx={{
                                        width: '100%',
                                        mb: 1,
                                    }}
                                >
                                    <Typography>
                                        <strong>Paper Id: </strong> {id[0]}
                                    </Typography>
                                    <Typography>
                                        <strong>Title: </strong> {id[1]}
                                    </Typography>
                                    <Typography>
                                        <strong># Citations:  </strong> {id[2]}
                                    </Typography>
                                    <Divider sx={{ ml: '15px', borderBottomWidth: 2, background: 'black' }} />
                                </Box>
                            )
                        })
                    }
                </Box>
            </Container>
        </ThemeProvider>
    )
}