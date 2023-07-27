import { styled } from '@mui/material/styles';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export function Editbar({ elevation, nodeSelected, close }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%'
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
    });
  };

  const getNodeDetails = () => {
    let coordinates = ""
    let coordinatesLabel = ""
    if (nodeSelected) {
      // I can't figure out how to do typeof in this, it always returns object
      let coordinatesLabel = "(x, y)";
      let coordinates = "(" + nodeSelected.x?.toFixed(2) + ", " + nodeSelected.y?.toFixed(2)
      if ("z" in nodeSelected) {
        coordinatesLabel = "(x, y, z)";
        coordinates += (", " + nodeSelected.z?.toFixed(2))
      }
      coordinates += ")";

      return (
        <>
          <Typography variant="h3">
            Node Details
          </Typography>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Typography variant='body2'>
                {"Node ID is: " + nodeSelected.id}
              </Typography>
              <Typography variant='body2'>
                {"Node coordinates " + coordinatesLabel + " are: " + coordinates}
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                id="description"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
              <Button
                fullWidth
                variant="text"
                sx={{ mb: 2 }}
                onClick={close}
              >
                Close
              </Button>
            </Box>
          </Box>
        </>
      )
    }
  };

  return (
    // <Item elevation={elevation}>
    //   { getNodeDetails() }
    // </Item>
    <Item>
      Cock
    </Item>
  )
}