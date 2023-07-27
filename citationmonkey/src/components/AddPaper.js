import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import * as util from '../utilities'

const defaultTheme = createTheme();

const addPaperStatusBox = (status) => {
  if (status === "success") {
    return (
      <Box
        sx={{
          color: "#318500",
          textAlign: "center",
        }}
      >
        <Typography>Paper added successfully!</Typography>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          color: "#FF0000",
          textAlign: "center",
        }}
      >
        <Typography>Upload failed, please try again.</Typography>
      </Box>
    );
  }
};

export function AddPaper() {
  const [status, setStatus] = React.useState("");

  const [errorStatusObj, setErrorStatusObj] = React.useState({
    author_id: "",
    title: "",
    year: "",
    fos_name: "",
    n_citation: "",
    url: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    var validPayload = true;
    const data = new FormData(event.currentTarget);
    const payload = {
      author_id: data.get("author"),
      title: data.get("title"),
      year: data.get("year"),
      fos_name: data.get("fos"),
      n_citation: data.get("n_citations"),
      url: data.get("url"),
    };
    setStatus('')

    if (!payload.author_id) {
      setErrorStatusObj({
        ...errorStatusObj,
        author_id: "Required Field",
      });
      validPayload = false;
    } else if (!util.checkIntInput(payload.author_id)) {
      setErrorStatusObj({
        ...errorStatusObj,
        author_id: "Invalid Entry",
      });
      validPayload = false;
    } else {
      setErrorStatusObj({ ...errorStatusObj, author_id: "" });
    }

    if (!payload.title) {
      setErrorStatusObj((old) => { return { ...old, title: "Required Field" } })
      validPayload = false;
    } else {
      setErrorStatusObj((old) => { return { ...old, title: "" } })
    }

    if (!payload.year) {
      setErrorStatusObj((old) => { return { ...old, year: "Required Field" } })
      validPayload = false;
    } else if (!util.checkIntInput(payload.year) || payload.year.length !== 4) {
      setErrorStatusObj((old) => { return { ...old, year: "Invalid Year" } })
      validPayload = false;
    } else {
      setErrorStatusObj((old) => { return { ...old, year: "" } })
    }

    if (!payload.fos_name) {
      setErrorStatusObj((old) => { return { ...old, fos_name: "Required Field" } })
      validPayload = false;
    } else {
      setErrorStatusObj((old) => { return { ...old, fos_name: "" } })
    }

    if (!payload.n_citation) {
      setErrorStatusObj((old) => { return { ...old, n_citation: "Required Field" } });
      validPayload = false;
    } else if (!util.checkIntInput(payload.n_citation)) {
      setErrorStatusObj((old) => { return { ...old, n_citation: "Invalid Entry" } });
      validPayload = false;
    } else {
      setErrorStatusObj((old) => { return { ...old, n_citation: "" } });
    }

    if (!payload.url) {
      setErrorStatusObj((old) => { return { ...old, url: "Required Field" } })
      validPayload = false;
    } else if (!payload.url.includes('.')) {
      setErrorStatusObj((old) => { return { ...old, url: "Invalid URL" } })
      validPayload = false;
    } else {
      setErrorStatusObj((old) => { return { ...old, url: "" } })
    }

    if (validPayload) {
      const potential_fields = [
        "abstract",
        "page_start",
        "page_end",
        "doc_type",
        "lang",
        "vol",
        "issue",
        "issn",
        "isbn",
        "doi",
        "abstract",
      ];

      for (const x of potential_fields) {
        if (data.has(x)) {
          payload[x] = data.get(x);
        }
      }

      axios
        .put("http://54.242.252.72/publish", payload)
        .then(function (response) {
          setStatus(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Paper
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title-paper"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  error={errorStatusObj.title ? true : false}
                  helperText={errorStatusObj.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="author-paper"
                  name="author"
                  required
                  fullWidth
                  id="author"
                  label="Author ID"
                  autoFocus
                  error={errorStatusObj.author_id ? true : false}
                  helperText={errorStatusObj.author_id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="abstract-paper"
                  name="abstract"
                  fullWidth
                  id="abstract"
                  label="Abstract"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fos-paper"
                  name="fos"
                  required
                  id="fos"
                  label="Field Of Study"
                  autoFocus
                  error={errorStatusObj.fos_name ? true : false}
                  helperText={errorStatusObj.fos_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="url-paper"
                  name="url"
                  required
                  id="url"
                  label="URL"
                  autoFocus
                  error={errorStatusObj.url ? true : false}
                  helperText={errorStatusObj.url}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="n_citations-paper"
                  name="n_citations"
                  required
                  id="n_citations"
                  label="# Cites"
                  autoFocus
                  error={errorStatusObj.n_citation ? true : false}
                  helperText={errorStatusObj.n_citation}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="year-paper"
                  name="year"
                  required
                  id="year"
                  label="Year"
                  autoFocus
                  error={errorStatusObj.year ? true : false}
                  helperText={errorStatusObj.year}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="lang-paper"
                  name="lang"
                  id="lang"
                  label="Lang"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="pagestart-paper"
                  name="pagestart"
                  id="pagestart"
                  label="Start Pg#"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="pageend-paper"
                  name="pageend"
                  id="pageend"
                  label="End Page#"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="doctype-paper"
                  name="doctype"
                  id="doctype"
                  label="Doc Type"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="doi-paper"
                  name="doi"
                  id="doi"
                  label="DOI"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="vol-paper"
                  name="vol"
                  id="vol"
                  label="Volume#"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="issue-paper"
                  name="issue"
                  id="issue"
                  label="Issue#"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="issn-paper"
                  name="issn"
                  id="issn"
                  label="ISSN#"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="isbn-paper"
                  name="isbn"
                  id="isbn"
                  label="ISBN#"
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
              Publish Your Paper!
            </Button>
          </Box>
        </Box>
        {status && addPaperStatusBox(status)}
      </Container>
    </ThemeProvider>
  );
}
