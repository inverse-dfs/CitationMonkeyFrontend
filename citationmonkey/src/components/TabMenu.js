import React from "react"
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useState } from "react"
import { AddPaper } from "./AddPaper"
import { GetCitations } from "./GetCitations"
import { KeywordSearch } from "./KeywordSearch.tsx"
import { UpdatePaper } from "./UpdatePaper"

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
                    <Tab label="Paper Keyword Search" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AddPaper />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UpdatePaper />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GetCitations />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <KeywordSearch />
            </TabPanel>
        </Box>
    )
}
