import React from "react"
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { useState } from "react"
import { AddPaper } from "./AddPaper"
import { DeletePaper } from "./DeletePaper"
import { UpdatePaper } from "./UpdatePaper"
import { UserCreate } from "./UserCreate"
import { UserLogin } from "./UserLogin"

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
                    <Tab label="User Signup" {...a11yProps(0)} />
                    <Tab label="User Login" {...a11yProps(1)} />
                    <Tab label="Add Paper" {...a11yProps(2)} />
                    <Tab label="Delete Paper" {...a11yProps(3)} />
                    <Tab label="Update Paper" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserCreate />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AddPaper />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <DeletePaper />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <UpdatePaper />
            </TabPanel>
        </Box>
    )
}
