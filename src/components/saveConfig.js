/**
 * Created by calvin on 6/10/20.
 */

import React from 'react'

class saveConfig extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default saveConfig;