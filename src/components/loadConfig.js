import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const buttonStyle = {
    margin: '10px'
};

class LoadConfig extends Component {

    constructor(props) {
        super(props);
        this.loadConfig = this.loadConfig.bind(this);
    }


    parseData(data) {
    }

    loadConfig() {
        console.log("Load Config Here!")
    }

    render() {
        return (
            <Button style={buttonStyle} onClick={this.loadConfig} type="submit" variant="outlined">
                Load API Configuration
            </Button>
        );
    }


}

export default LoadConfig;