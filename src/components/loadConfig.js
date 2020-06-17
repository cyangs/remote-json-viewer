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
      this.props.resetState(book_config)
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