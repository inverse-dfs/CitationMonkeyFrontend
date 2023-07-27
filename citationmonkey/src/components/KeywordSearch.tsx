import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import KeyIcon from '@mui/icons-material/Key';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';
import QueryParam from './QueryParam.tsx'
import { booleanLogic, equality, queryField, queryObject } from '../types/queries.ts'
import { BASE_URL } from '../types/url.ts'

const defaultTheme = createTheme()

export function KeywordSearch() {
    const [data, setData] = React.useState<any[] | null>(null);
    const [conditionNumber, setConditionNumber] = React.useState(1)
    const defaultFirstConditionVal: queryObject = { field: queryField.KEYWORDS, equality: equality.EXACT, value: "", boolean: booleanLogic.None }
    const queryParams = React.useRef<Map<number, queryObject>>(new Map([[1, defaultFirstConditionVal]]))

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log(queryParams.current)
        const obj = Object.fromEntries(queryParams.current)
        console.log(obj)
        axios.post(BASE_URL + "keywords", obj).then(function (response) {
            console.log(response);
            setData(response.data)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateQueryParam = React.useCallback(
        (id: number, newValue: queryObject): void => {
            queryParams.current.set(id, newValue)
        },
        [conditionNumber]);

    const addNewLine = () => {
        let newId = conditionNumber + 1
        setConditionNumber((curr) => curr + 1)
        queryParams.current.set(newId, { ...defaultFirstConditionVal, boolean: booleanLogic.AND })
    }

    const clearQuery = () => {
        queryParams.current.clear()
        setConditionNumber(0)
        setData(null)
    }

    useEffect(() => {
        if (conditionNumber == 0) {
            queryParams.current.set(1, defaultFirstConditionVal)
            setConditionNumber(1)
        }
    }, [conditionNumber])

    const displayData = () => {
        if (data == null) return <></>
        else if (data.length === 0) {
            return (
                <Box
                    sx={{
                        color: "#FF0000",
                        textAlign: "center",
                    }}
                >
                    <Typography>No Entries Found</Typography>
                </Box>)
        } else {
            return (
                data.map((id) => {
                    return (
                        <Box
                            sx={{
                                width: '100%',
                                mb: 1,
                            }}
                            key={id}
                        >
                            <Typography component={'div'}>
                                <strong>Paper Id: </strong> {id[0]}
                            </Typography>
                            <Typography component={'div'}>
                                <strong>Author: </strong> {id[1]}
                            </Typography>
                            <Typography component={'div'}>
                                <strong>Title:  </strong> {id[3]}
                            </Typography>
                            <Divider component={'div'} sx={{ ml: '15px', borderBottomWidth: 2, background: 'black' }} />
                        </Box>
                    )
                })
            )
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
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
                </Box>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 3,
                        // border: '2px solid red'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {
                                [...queryParams.current].map(([id, val]) => {
                                    if (id === 1) {
                                        return <QueryParam
                                            first={true}
                                            key={id}
                                            id={id}
                                            defaultValue={queryParams.current.get(id)!}
                                            updateQueryParam={updateQueryParam}
                                        />
                                    }
                                    else {
                                        return <QueryParam
                                            first={false}
                                            key={id}
                                            id={id}
                                            defaultValue={queryParams.current.get(id)!}
                                            updateQueryParam={updateQueryParam} />
                                    }
                                })
                            }
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'inline-flex'
                        }}
                    >
                        <Button
                            variant="text"
                            sx={{ mt: 2 }}
                            onClick={addNewLine}
                        >
                            Add New Line
                        </Button>
                        <Button
                            variant="text"
                            sx={{ mt: 2 }}
                            onClick={clearQuery}
                        >
                            Clear
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Find Papers!
                    </Button>
                </Box>
                {data &&
                    displayData()
                }
            </Container>
        </ThemeProvider>
    )
}