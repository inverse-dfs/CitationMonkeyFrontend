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

const defaultTheme = createTheme()


export function GetCitations() {
    const [data, setData] = React.useState(null);
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const paper_id = data.get('rootid')
        axios.get("http://54.242.252.72/citations/"+paper_id).then(function (response) {
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
                                    name="rootid"
                                    required
                                    fullWidth
                                    id="rootid"
                                    label="Root Paper ID"
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
                    {data &&
                        data.map((id) => {
                            let val = "Id: " + id[0] + " \t \t Title: " + id[1] + "\t\t Number of citations:" + id[2]
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