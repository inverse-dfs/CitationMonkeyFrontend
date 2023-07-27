import React from "react"
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useState } from "react"
import * as comps from '../components'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export function TabMenu() {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Add Paper" {...a11yProps(0)} />
                    <Tab label="Update Paper" {...a11yProps(1)} />
                    <Tab label="Find Linked Citations" {...a11yProps(2)} />
                    <Tab label="Citation Graph" {...a11yProps(3)} />
                    <Tab label="Paper Keyword Search" {...a11yProps(4)} />
                    <Tab label="Elo Battle" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <comps.AddPaper />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <comps.UpdatePaper />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <comps.GetCitations />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <comps.CitGraph />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <comps.KeywordSearch />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <comps.EloBattle />
            </TabPanel>
        </Box>
    )
}
