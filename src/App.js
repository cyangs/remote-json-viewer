import React, { useState } from 'react';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'fontsource-roboto';

import {
    Button,
    MenuItem,
    List,
    ListItem,
    Grid,
    Select,
    InputLabel,
    TextField,
    TextareaAutosize,
    Typography
} from '@material-ui/core'

import LeftNav from './components/leftNav'
import SaveConfig from './components/saveConfig'
import LoadConfig from './components/loadConfig'
import { ValidateUrl } from './helpers';


SyntaxHighlighter.registerLanguage('json', json);

const mainStyle = {
    header: {
        margin: '40px',
    },
    modules: {
        marginLeft: '45px',
    },
    innerModule: {
        width: '90%',
        background: '#eeeeee'
    },
    form: {
        paddingTop: '20px',
        width: '100%'
    },
    formList: {
        width: '90%'
    }
};

const buttonStyle = {
    margin: '10px'
};


function App() {
    const [count, setCount] = useState(1);
    const [state, setState] = useState([]);

    function resetState (newStates){
        setState(newStates);
        setCount(newStates.length)
    }

    function RemoteJSONViewer(props){
        const key = props.index;

        if (!state[key]) {
            state[key] = {};
        }

        const onChange = (attr, event) => {
            state[key][attr] = event.target.value;
            setState(state);
        };

        // USE THIS FOR TEST - https://api.carbonintensity.org.uk/intensity
        // USE THIS ALSO - https://aws.random.cat/meow

        // https://api-staging.booker.com/v5/auth/connect/token
        // { Ocp-Apim-Subscription-Key: a729ab67877e4516b08843ae8b30ac36 }

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        const NameField = () => (
            <TextField fullWidth id="outlined-basic" label="Name" variant="standard" value={state[key].name} onChange={onChange.bind(null, 'name')}/>
        );

        const headers = () => {
            const curState = state[key];
            console.log("Headers");
            console.log(curState);
            return curState
             // { "Ocp-Apim-Subscription-Key": "a729ab67877e4516b08843ae8b30ac36" }
        };

        return (
            <div style={mainStyle.innerModule}>
                <div style={{ paddingLeft:'35px', paddingTop:'10px'}}>
                    <h3> {key + 1}. {state[key].name} </h3>
                </div>
                <Grid style={{ paddingLeft:'30px' }} container spacing={3}>
                    <form style={mainStyle.form} onSubmit={e => e.preventDefault() || fetch(proxyurl + state[key].url,
                        {
                            headers: headers(),
                            method: state[key].method,
                            body: JSON.stringify(state[key].body)

                        })
                        .then(response => response.json())
                        .then(json => {
                            const stateCopy = JSON.parse(JSON.stringify(state));
                            stateCopy[key] = { ...stateCopy[key], json, error: null };
                            setState(stateCopy);
                        })
                        .catch(error => setState({ ...state, error, json: null }))
                    }>
                        <Grid item xs={12}>
                            <List style={mainStyle.formList} component="nav">
                                <ListItem>
                                    { state[key].name ? null : <NameField/> }
                                </ListItem>
                                <ListItem>
                                    <TextField fullWidth id="outlined-basic" label="URL" variant="standard" value={state[key].url} onChange={onChange.bind(null, 'url')}/>
                                </ListItem>
                                <ListItem>
                                    <TextareaAutosize
                                        rowsMin={3}
                                        aria-label="maximum height"
                                        placeholder="Headers"
                                        fullWidth
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        value={JSON.stringify(state[key].headers)}
                                        onChange={onChange.bind(null, 'headers')}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextareaAutosize
                                        rowsMin={3}
                                        aria-label="maximum height"
                                        placeholder="Body"
                                        fullWidth
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        value={JSON.stringify(state[key].body)}
                                        onChange={onChange.bind(null, 'body')}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid style={{ paddingLeft:'18px' }} item xs={12}>
                            <InputLabel id="call-type-select-label">Request Type</InputLabel>
                            <Select
                                labelId="call-type-label"
                                id="call-type-select"
                                value={state[key].method}
                                style={{ width: '130px' }}
                                onChange={onChange.bind(null, 'method')}
                            >
                                <MenuItem value={"GET"}>GET</MenuItem>
                                <MenuItem value={"POST"}>POST</MenuItem>
                                <MenuItem value={"PUT"}>PUT</MenuItem>
                                <MenuItem value={"DELETE"}>DELETE</MenuItem>
                            </Select>
                            <Button style={buttonStyle} type="submit" variant="outlined" color="secondary">Make Request</Button>
                        </Grid>
                        <br/>
                        <div style={{width:'95%'}} id="response">
                            {state[key].json && <SyntaxHighlighter language="json" style={monokai} >{JSON.stringify(state[key].json, null, '  ')}</SyntaxHighlighter>}
                            {state[key].error && <pre>{state[key].error.toString()}</pre>}
                        </div>
                    </form>
                </Grid>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div>
                <div style={{display:"inline-block", width:"15%"}}>
                    <LeftNav data={state} />
                </div>
                <div style={{display:"inline-block", width:"85%"}}>
                    <Grid container style={{ marginBottom: '-20px' }}>
                        <Grid item xs={12}>
                            <Typography style={mainStyle.header} variant="h2" component="h2">
                                Integration Flow Manager
                            </Typography>
                            <div className="row" style={mainStyle.header}>
                                <Button style={buttonStyle} onClick={() => setCount(Math.max(count - 1, 0))} variant="outlined" color="primary">Remove Last API</Button>
                                <Button style={buttonStyle} onClick={() => setCount(count + 1)} variant="outlined" color="primary">Add New API</Button>
                                <Button style={buttonStyle} onClick={() => setState([])} variant="outlined" color="secondary">Reset All</Button>
                                <SaveConfig data={state}/>
                                <LoadConfig resetState={resetState}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={mainStyle.modules}>
                                {Array(count).fill(null).map((_, i) => <RemoteJSONViewer key={i} index={i} />)}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>

    );
}

export default App;
