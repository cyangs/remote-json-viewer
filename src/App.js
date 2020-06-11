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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';

import saveConfig from './components/saveConfig';

SyntaxHighlighter.registerLanguage('json', json);

const mainStyle = {
    header: {
        margin: '40px',
    },
    modules: {
        margin: '70px',
        background: '#eeeeee'
    },
};



const buttonStyle = {
    margin: '10px'
}

function RemoteJSONViewer(){
    const [state, setState] = useState({
        url: '',
        headers: '',
        body: '',
        name: '',
        method: '',
        json: null,
        error: null
    });


    return (
        <div>
            <h3> # title</h3>
            <Grid container spacing={3}>
                <form onSubmit={e => e.preventDefault() || fetch(state.url, {
                    method: state.method,
                    headers: state.headers,
                    body: JSON.stringify(state.body)
                })
                    .then(response => response.json())
                    .then(json => setState({ ...state, json, error: null }))
                    .catch(error => setState({ ...state, error, json: null }))
                }>
                    <Grid item xs={12}>
                        <List component="nav">
                            <ListItem>
                                <label>Name
                                    <Input type="text" value={state.name} onChange={event => setState({ ...state, name: event.target.value })} />
                                </label>
                            </ListItem>
                            <ListItem>
                                <label>URL
                                    <Input type="text" value={state.url} onChange={event => setState({ ...state, url: event.target.value })} />
                                </label>
                            </ListItem>
                            <ListItem>
                                <label>Headers
                                    <Input type="text" value={state.headers} onChange={event => setState({ ...state, headers: event.target.value })} />
                                </label>
                            </ListItem>
                            <ListItem>
                                <label>Body
                                    <Input type="text" value={state.body} onChange={event => setState({ ...state, body: event.target.value })} />
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
                    {state.json && <SyntaxHighlighter language="json" style={monokai} >{JSON.stringify(state.json, null, '  ')}</SyntaxHighlighter>}
                    {state.error && <pre>{state.error.toString()}</pre>}
                </form>




            </Grid>

        </div>
    )
}
/*
 Textarea-based parts:

 let textArea = useRef(null);
 useEffect(() => {
 if (!textArea.current) return;
 textArea.current.style.width = Math.min(window.innerWidth, textArea.current.scrollWidth + 10) + 'px';
 textArea.current.style.height = Math.min(window.innerHeight, textArea.current.scrollHeight + 10) + 'px';
 });

 {state.json && <textarea ref={textArea} value={JSON.stringify(state.json, null, '  ')} disabled={true} onChange={() => {console.log('texatrea change')}}/>}
 textarea {
 white-space: pre;
 overflow-wrap: normal;
 }
 */


function App() {
    const [count, setCount] = useState(1);
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
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={mainStyle.modules}>
                            {Array(count).fill(null).map((_, i) => <RemoteJSONViewer key={i} />)}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>

    );
}

export default App;
