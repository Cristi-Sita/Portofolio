import React from 'react';

class CustomInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        }

    }

    render() {
        return (
            <input
                className="customInput"
                onChange={this.props.handleChange.bind(this)}
                value={this.props.value}
                onClick={this.props.onClick}
            // style={{
            //   width: '50%',
            //   overflow: 'auto',
            // }}
            >

            </input>
        )
    }
}

export default CustomInput
