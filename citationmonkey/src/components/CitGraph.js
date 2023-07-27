import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { Graph } from './CitGraphComponents/Graph';
import { useState, useEffect } from 'react'
import { Editbar } from './CitGraphComponents/Editbar'
import misData from './CitGraphComponents/miserables.json'
import axios from 'axios';
import { CompletionTriggerKind } from 'typescript';

export function CitGraph() {
  const genTree = (N, idOffset, group) => {
    return {
      nodes: [...Array(N).keys()].map((i) => ({
         id: i + idOffset,
         group: group
        })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id + idOffset,
          target: Math.round(Math.random() * (id - 1)) + idOffset
        }))
    }
  }
  
  const genData = (nTrees, N) => {
    let final = {
      nodes: [],
      links: []
    }
    let idOffset = 0
    for (let i = 0; i < nTrees; i++) {
      let numNodes = Math.round(Math.random() * (N))
      let { nodes, links } = genTree(numNodes, idOffset, i)
      final.nodes = [...final.nodes, ...nodes]
      final.links = [...final.links, ...links]
      console.log(idOffset, numNodes)
      idOffset += numNodes
    }
    return final
  }

  const N = 25;
  const nTrees = 5
  const [nodeDetails, setNodeDetails] = useState(null);
  const [nodeTitle, setNodeTitle] = useState('')
  const [graphData, setGraphData] = useState(null)
  const [paperIdError, setPaperIdError] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");



  useEffect(() => {
    setGraphData(misData);
    console.log("rerender")
  }, [])

  const handleHover = (node, prevNode) => {
    console.log(node)
    if (node != null) {
      setNodeTitle(node.title)
    } else {
      setNodeTitle('')
    }
  }

  const formatData = (data) => {
    let nodesDict = {}
    let edges = []
    for (let i = 0; i < data.length; ++i) {
      let citerId = data[i][0]
      let citeeId = data[i][1]
      let citeeTitle = data[i][2]
      let citerTitle = data[i][3]
      nodesDict[citerId] = { 
        id: citerId,
        title: citerTitle,
        group: 1
      }
      nodesDict[citeeId] = {
        id: citeeId,
        title: citeeTitle,
        group: 1
      }
      edges.push(
        {
          "source": citerId,
          "target": citeeId,
          "value": 2
        }
      )
    }
    return {
      nodes: Object.values(nodesDict),
      links: edges
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const paper_id = data.get('paperid')

    if (!paper_id) {
        setPaperIdError('Paper ID is required')
    } else {
        setPaperIdError('')
        axios.get("http://54.242.252.72/citations/" + paper_id).then(function (response) {
          console.log(response.data)
          let formattedData = formatData(response.data)
          console.log(formattedData)
          setData(formattedData)

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
  const nodeClicked = (e) => {
    console.log(e);
    setNodeDetails(e);
  }

  const closeEditBar = () => {
    setNodeDetails(null);
  }

  return (
    <div>
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
      <Box sx={{ 'width': 1, 'height': 1 }}>
        <Grid sx={{ 'width': 1, 'height': 1, overflow: "hidden" }} container spacing={2}>
        <Grid item xs={8}>
            {data ? 'Use your scroll wheel to pinch and zoom!' : ''}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ 'width': 1, 'height': 1 }}>
        <Grid sx={{ 'width': 1, 'height': 1, overflow: "hidden" }} container spacing={2}>
        <Grid item xs={8}>
            {data ? nodeTitle ? `${nodeTitle}` : 'Click on a node to print its title!' : ''}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ 'width': 1, 'height': 1 }}>
        <Grid sx={{ 'width': 1, 'height': 1, overflow: "hidden" }} container spacing={2}>
          <Grid item xs={8}>
            <Graph nodeClicked={nodeClicked} nodeHover={handleHover} data={data} />
          </Grid>
        </Grid>
      </Box>
    </div>

  )
}

