import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const fs = require('fs')


const buttonStyle = {
    margin: '10px'
};

class saveConfig extends Component {

    constructor(props) {
        super(props);
        this.saveToLocal = this.saveToLocal.bind(this);
    }

    getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day =`${date.getDate()}`.padStart(2, '0');
        return `${year}${month}${day}`
    }

    parseData(data) {
        let formattedData = [];
        for (let key of Object.keys(data)) {
            let apiCall = data[key];
            let dataBody = {};
            dataBody['name'] = "PLACEHOLDER";
            dataBody['response'] = apiCall.json;
            formattedData.push(dataBody)
        }
        return formattedData
    }

    saveToLocal() {
        const data = this.parseData(this.props.data)
        try {
            const fileData = JSON.stringify(data);
            const blob = new Blob([fileData], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${this.getDateString()}_api_configurations.json`;
            link.href = url;
            link.click();

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <Button style={buttonStyle} onClick={this.saveToLocal} type="submit" variant="outlined">
                Save API Configuration
            </Button>
        );
    }


}

export default saveConfig;