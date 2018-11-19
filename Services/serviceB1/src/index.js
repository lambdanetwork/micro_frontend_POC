import React from 'react'
import PropTypes from 'prop-types'

class ServiceB1 extends React.PureComponent{
    static propTypes = {
        inputValue: PropTypes.string
    }
    render(){
        return (
            <div>
                <p>Hi</p>
                <p style={{color: 'lightblue'}}>{this.props.inputValue}</p>
                <p>This service B1 is calling your name</p>
            </div>
        )
    }
}

if(typeof window !== 'undefined' || typeof window !== 'null'){
    window.SERVICEB_MAIN = ServiceB1
}
export default ServiceB1