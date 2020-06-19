import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Tabs,
    Tab,
    Typography,
    Box
} from '@material-ui/core'

const navStyle = {
    main: {
        flexGrow: 1,
        height: "700px",
        display: "flex"
    },
    tab: {
        display: "block",
        width: "100%"
    },
    border: {
        borderRight: '1px solid'
    }
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function LeftNav({data}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={navStyle.main} >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                style={navStyle.border}
            >
                <div id="tab-labels">
                    {data.map((el, index) => (
                        <Tab style={navStyle.tab} label={el.name} {...a11yProps(index)} />
                    ))}
                </div>
            </Tabs>
            {data.map(({name}, index) => (
                <TabPanel value={name} index={index} />
            ))}
        </div>
    );
}