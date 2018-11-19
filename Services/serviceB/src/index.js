import React from 'react'
import PropTypes from 'prop-types'
const domain = 'http://localhost:3002'
const pathEnum = {
    '/NestedFragments/serviceB1': domain+'/script/serviceB1',
    '/NestedFragments/serviceB2': domain+'/script/serviceB2',
}

class ServiceB extends React.PureComponent{
    static propTypes = {
        inputValue: PropTypes.string,
        pathEnum: PropTypes.arrayOf(PropTypes.string)
    }
    constructor(props){
        super(props)
        this.state = {
            PAGE: {serviceB_Main: null},
            path: ''
        }
    }

    componentDidMount(){
        let pathname = window.location.pathname
        if(pathname === '/NestedFragments') pathname += '/serviceB1'
        this.changePage(pathname)        
    }
    render(){
        const ServiceB_Main = this.state.PAGE.serviceB_Main
        const tabStyle = {fontSize: 24, padding: '10px 60px', width: '40%', cursor: 'pointer'}
        const selectedStyle = {...tabStyle, backgroundColor: 'lightgrey', color: 'white'}
        const unselectedStyle = {...tabStyle, backgroundColor: 'darkgrey', color: 'white'}
        const B1Style = this.state.path.indexOf('/serviceB1') >= 0 ? selectedStyle : unselectedStyle
        const B2Style = this.state.path.indexOf('/serviceB2') >= 0 ? selectedStyle : unselectedStyle
        return (
            <div>
                <h1>Content From Service B</h1>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={B1Style} onClick={this.changePage.bind(this, '/NestedFragments/serviceB1')}>
                        Service B1
                    </div>
                    <div style={B2Style} onClick={this.changePage.bind(this, '/NestedFragments/serviceB2')}>
                        Service B2
                    </div>
                </div>
                <br />

                {/* Body */}
                {ServiceB_Main && <ServiceB_Main inputValue={this.props.inputValue}/>}
            </div>
        )
    }

    changePage(path){
        const self = this
        this.setState({ path }, () => {
            const getPath = pathEnum[this.state.path]
            window.history.pushState('data to be passed', 'Title of the page', path);
            console.log('state', this.state)
            attachScript(getPath)
            .then( res => {
                self.setState({ PAGE: {
                    serviceB_Main: window.SERVICEB_MAIN
                }})
            })  
        })
    }
}

if(typeof window !== 'undefined' || typeof window !== 'null'){
    window.MAINBODY = ServiceB
}
export default ServiceB


function attachScript(script,globalVar){
    return new Promise((resolve, reject) => {
        const elScript = document.getElementById('main_BScript')
        if(elScript) document.body.removeChild(elScript)
        const newScript = document.createElement('script')
        newScript.onload = () => resolve()
        newScript.async = true
        newScript.id = 'main_BScript'
        newScript.src = script
        document.body.appendChild(newScript)
    })
}