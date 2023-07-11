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

const defaultTheme = createTheme();

export function UpdatePaper() {
  const [status, setStatus] = React.useState("");
  const [errorStatusMap, setErrorStatusMap] = React.useState({
    paperId: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      author_id: data.get("author"),
      title: data.get("title"),
      year: data.get("year"),
      fos_name: data.get("fos"),
      n_citation: data.get("n_citations"),
      url: data.get("url"),
    };

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
      .post("http://54.242.252.72/upload", payload)
      .then(function (response) {
        console.log(response);
        setStatus(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
            Update Paper
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
                  autoComplete="paperid"
                  name="rootid"
                  required
                  fullWidth
                  id="rootid"
                  label="Root Paper ID"
                  autoFocus
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
                  id="fos"
                  label="Field Of Study"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="url-paper"
                  name="url"
                  id="url"
                  label="URL"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="n_citations-paper"
                  name="n_citations"
                  id="n_citations"
                  label="#Cites"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="year-paper"
                  name="year"
                  id="year"
                  label="Year"
                  autoFocus
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
              Update this Paper!
            </Button>
          </Box>
        </Box>
        {status === "success" && (
          <Box
            sx={{
              backgroundColor: "#2ED810",
              textAlign: "center",
            }}
          >
            <Typography>Successfully updated paper</Typography>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
