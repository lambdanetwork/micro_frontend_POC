import React from 'react'
import ReactDOM from "react-dom";

class HeaderService extends React.PureComponent{
    render(){
        return (
            <div style={{display: 'flex', width: '100%', backgroundColor: 'blue', color: 'white', padding: 20}}>
                Dashboard
            </div>
        )
    }
}

ReactDOM.render(<HeaderService />, document.getElementById("header"));

