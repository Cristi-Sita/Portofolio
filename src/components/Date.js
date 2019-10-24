import React from "react";
import DatePicker from "react-datepicker";

import CustomInput from "./CustomInput";

class DateP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.props.handleChange(this.props.fieldName, this.state.startDate);
    }

    handleChange = date => {
        this.setState(
            {
                startDate: date
            },
            () => {
                this.props.handleChange(this.props.fieldName, this.state.startDate);
            }
        );
    };
    render() {
        console.log("Date rendered boi");
        return (

            <DatePicker
                className="datepicker"
                customInput={<CustomInput handleChange={this.handleChange.bind(this)} />}
                date={this.state.startDate}
                selected={this.state.startDate}
                onChange={this.handleChange}
                onClick={this.props.onClick}
            />

        );
    }
}

export default DateP;