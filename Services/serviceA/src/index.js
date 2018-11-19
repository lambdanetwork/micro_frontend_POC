import React from 'react'
import PropTypes from 'prop-types'

class ServiceA extends React.PureComponent{
    static propTypes = {
        inputValue: PropTypes.string,
        updateInputValue: PropTypes.func
    }
    render(){
        return (
            <div>
                <h1>Welcome</h1>
                <h2 style={{color: 'lightblue'}}>{this.props.inputValue}</h2>
                <h3>This is your home page served by Service A</h3> 
                <input 
                    value={this.props.inputValue}
                    onChange={this.props.updateInputValue}    
                />
            </div>
        )
    }
}

if(typeof window !== 'undefined' || typeof window !== 'null'){
    window.MAINBODY = ServiceA
}
export default ServiceA