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
import KeyIcon from '@mui/icons-material/Key';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';

const defaultTheme = createTheme()

export function KeywordSearch() {
    const [data, setData] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const keywords = data.get('keywords').split(',')
        const trimmed_keywords = keywords.map(x=>x.trim()).join(',')
        axios.get("http://54.242.252.72/keywords/"+trimmed_keywords).then(function (response) {
            console.log(response);
            setData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
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
                        <KeyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Find Papers by Keywords
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="update-paper"
                                    name="keywords"
                                    required
                                    fullWidth
                                    id="keywords"
                                    label="Keywords"
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Find Papers!
                        </Button>
                    </Box>
                </Box>
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
                                        <strong>Field of Study:  </strong> {id[3]}
                                    </Typography>
                                    <Divider sx={{ ml: '15px', borderBottomWidth: 2, background: 'black' }} />
                                </Box>
                            )
                        })
                    }
            </Container>
        </ThemeProvider>
    )
}