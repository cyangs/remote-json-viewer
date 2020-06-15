import React, { useState } from 'react';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'fontsource-roboto';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Grid from '@material-ui/core/Grid';
import SaveConfig from './components/saveConfig'
import { ValidateUrl } from './helpers';


SyntaxHighlighter.registerLanguage('json', json);

const mainStyle = {
    header: {
        margin: '40px',
    },
    modules: {
        marginLeft: '70px',
    },
    innerModule: {
        marginTop: '40px',
        background: '#eeeeee'
    },
    form: {
        width: '100%'
    },
    formList: {
        width: '500px'
    }
};



const buttonStyle = {
    margin: '10px'
}


function App() {
    const [count, setCount] = useState(1);
    const [state, setState] = useState([]);


    function RemoteJSONViewer(props){
        const key = props.index;

        if (!state[key]) {
            state[key] = {};
        }

        const onChange = (attr, event) => {
            const value = event.target.value;

            state[key][attr] = value;
            setState(state);
        };


        const formId = `${key}-call`;
        const generateTitle = `${key + 1}`;

        // USE THIS FOR TEST - https://api.carbonintensity.org.uk/intensity

        // USE THIS ALSO - https://aws.random.cat/meow
        
        const updateForm = (state) => {
            let formDiv = document.getElementById(formId);
            let curState = state[key]
            //
            // console.log("UPDATINGFORM")
            // console.log(curState)

            const titleName = curState.name || "";

            formDiv.children[0].innerText = `${generateTitle}. ${titleName}`;
        };


        return (
            <div id={formId} style={mainStyle.innerModule}>
                <h3> {generateTitle} </h3>
                <Grid container spacing={3}>
                    <form style={mainStyle.form} onSubmit={e => e.preventDefault() || fetch(state[key].url)
                        .then(response => response.json())
                        .then(json => {
                            const stateCopy = JSON.parse(JSON.stringify(state));
                            stateCopy[key] = { json, error: null };
                            setState(stateCopy);
                            updateForm(state)
                        })
                        .catch(error => setState({ ...state, error, json: null }))
                    }>
                        <Grid item xs={12}>
                            <List style={mainStyle.formList} component="nav">
                                <ListItem>
                                    <label>Name
                                        <Input type="text" value={state.name} onChange={onChange.bind(null, 'name')} />
                                    </label>
                                </ListItem>
                                <ListItem>
                                    <label>URL
                                        <Input name="url" type="text" value={state.url} onChange={onChange.bind(null, 'url')} />
                                    </label>
                                </ListItem>
                                <ListItem>
                                    <label>Headers
                                        <Input type="text" value={state.headers} onChange={onChange.bind(null, 'headers')} />
                                    </label>
                                </ListItem>
                                <ListItem>
                                    <label>Body
                                        <Input type="text" value={state.body} onChange={onChange.bind(null, 'body')} />
                                    </label>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel id="call-type-select-label">Request Type</InputLabel>
                            <Select
                                labelId="call-type-label"
                                id="call-type-select"
                                value="GET"
                                // onChange={handleChange}
                            >
                                <MenuItem value="GET">GET</MenuItem>
                                <MenuItem value="POST">POST</MenuItem>
                                <MenuItem value="PUT">PUT</MenuItem>
                                <MenuItem value="DELETE">DELETE</MenuItem>

                            </Select>
                            <Button style={buttonStyle} type="submit" variant="outlined" color="secondary">Make Request</Button>
                        </Grid>
                        <br/>
                        {state[key].json && <SyntaxHighlighter language="json" style={monokai} >{JSON.stringify(state[key].json, null, '  ')}</SyntaxHighlighter>}
                        {state[key].error && <pre>{state[key].error.toString()}</pre>}
                    </form>
                </Grid>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography style={mainStyle.header} variant="h2" component="h2">
                            Remote Json Viewer
                        </Typography>
                        <div style={mainStyle.header}>
                            <Button style={buttonStyle} onClick={() => setCount(Math.max(count - 1, 0))} variant="outlined" color="primary">Remove Last API</Button>
                            <Button style={buttonStyle} onClick={() => setCount(count + 1)} variant="outlined" color="secondary">Add New API</Button>
                            <SaveConfig data={state}/>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={mainStyle.modules}>
                            {Array(count).fill(null).map((_, i) => <RemoteJSONViewer key={i} index={i} />)}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>

    );
}

export default App;
