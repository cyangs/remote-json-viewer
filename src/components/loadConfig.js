import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';


import book_config from './book_config.json';


class LoadConfig extends Component {
    constructor(props) {
        super(props);
        this.loadConfig = this.loadConfig.bind(this);
    }

    loadConfig() {

        const configStates = [];

        book_config.forEach(function (n_state) {
            let stateCopy = {
                method: n_state.method,
                url: n_state.url,
                name: n_state.name,
                json: n_state.response
            };
            configStates.push(stateCopy)
        });
        this.props.resetState(configStates)
    }

    render() {
        return (
            <div>
                <Select
                        labelId="config-label"
                        id="config-select"
                        value="Booker Flow"
                        style={{width:"200px"}}
                        onChange={this.loadConfig}
                    >
                    <MenuItem value="booker">Booker Flow</MenuItem>
                </Select>
                <FormHelperText>Load API Configuration</FormHelperText>
            </div>
        )
    }



}

export default LoadConfig;