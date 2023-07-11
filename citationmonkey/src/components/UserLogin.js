import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';

const defaultTheme = createTheme()

export function UserLogin() {
    const [errorStatusMap, setErrorStatusMap] = React.useState({
        'email': '',
        'password': '',
    })
    const [status, setStatus] = React.useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = data.get('email')
        const password = data.get('password')

        if (!email) {
            setErrorStatusMap((prev) => {return {'email': 'Email is required', ...prev}})
        } else {
            setErrorStatusMap((prev) => {return {'email': '', ...prev}})
        }

        if (!password) {
            setErrorStatusMap((prev) => {return {'password': 'Password is required', ...prev}})
        } else {
            setErrorStatusMap((prev) => {return {'password': '', ...prev}})
        }

        if (email && password) {
            axios.post("http://54.242.252.72/login", {
                email: email,
                password: password,
            }).then(function (response) {
                if (response.data) {
                    setStatus(response.data)
                }

            }).catch(function (error) {
                console.log(error);
                setStatus(error);
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={errorStatusMap['email'] ? true : false}
                            helperText={errorStatusMap['email']}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={errorStatusMap['password'] ? true : false}
                            helperText={errorStatusMap['password']}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {
                            status === "Login Validated" &&
                            <Box
                                sx={{
                                    color: '#318500',
                                    textAlign: 'center'
                                }}
                            >
                                <Typography>
                                    Successfully Logged in!
                                </Typography>
                            </Box>
                        }
                        {
                            status === "Login Rejected" &&
                            <Box
                                sx={{
                                    color: '#FF0000',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography>
                                    Credentials Invalid!
                                </Typography>
                            </Box>
                        }
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}