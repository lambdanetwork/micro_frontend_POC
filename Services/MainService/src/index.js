import React from "react";
import ReactDOM from "react-dom";
const domain = 'http://localhost:3002'

const pathEnum = {
    '/': domain+'/serviceA' ,
    '/Home': domain+'/script/serviceA',
    '/NestedFragments': domain+'/script/serviceB',
    '/List': domain+'/script/serviceC',
    '/HeaderService': domain+'/script/HeaderService'
}

class Index extends React.Component {
    componentDidMount(){
        const self = this
        //fetch left side menu
        const leftSideScript = document.getElementById('left_side_menu')
        const headerScript = document.getElementById('header_script')
        headerScript.async
        headerScript.src = 'http://localhost:3002/script/HeaderService'
        leftSideScript.async
        leftSideScript.src='http://localhost:3002/script/LeftMenuService'
        leftSideScript.onload = () => this.setState({
            PAGE:{
                LeftMenu: window.LEFTMENU,
                MainBody: this.state.MainBody
            }
        })
        const pathname = window.location.pathname
        if(pathname.indexOf('NestedFragments') >= 0) return self.changePage('/NestedFragments')
        self.changePage(pathname)
    }
    constructor(props){
        super(props)
        this.state = {
            PAGE: {
                LeftMenu: null, 
                MainBody: null
            },
            inputValue: '',
            path: '/',
            data: {
                itemsForServiceC: [],
            }
        }
        this.changePage = this.changePage.bind(this)
        this.updateInputValue = this.updateInputValue.bind(this)
    }
    
    render(){
        const LeftMenu = this.state.PAGE.LeftMenu || (() => <div>'LOADING left Menu'</div>)
        const MainBody = this.state.PAGE.MainBody || (() => <div>'loading MainBody'</div>)
        let methodsForChildren = null
        let valueForChildren = {}
        switch(this.state.path){
            case '/Home':
                valueForChildren = {inputValue: this.state.inputValue}
                methodsForChildren = {updateInputValue: this.updateInputValue}
            break;
            case '/NestedFragments':
                valueForChildren = {inputValue: this.state.inputValue, pathEnum}
            break;
            case '/List':
                valueForChildren = {data: this.state.data, inputValue: this.state.inputValue}
            break;
        }
        return <div style={{height: '100vh'}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '20vw', height: '100%'}}>
                    <LeftMenu routeToPage={this.changePage}/>
                </div>
                <div style={{backgroundColor: 'white', height: '100vh', width: '100%', padding: '0 20px'}}>
                    <MainBody header={this.state.path} {...valueForChildren} {...methodsForChildren}/>
                </div>
            </div>
            
        </div>;
    }

    updateInputValue(e){
        e.preventDefault()
        const value = e.target.value
        this.setState({ inputValue: value})
    }

    changePage(path){
        const self = this
        this.setState({ path }, () => {
            const getPath = pathEnum[this.state.path]
            window.history.pushState('data to be passed', 'Title of the page', path);
            attachScript(getPath)
            .then( res => {
                self.setState({ PAGE: {
                    MainBody: window.MAINBODY,
                    LeftMenu: window.LEFTMENU
                }})
            })
        })
    }
};


ReactDOM.render(<Index />, document.getElementsByClassName("main")[0]);
window.INDEX = Index

function attachScript(script,globalVar){
    return new Promise((resolve, reject) => {
        const elScript = document.getElementById('main_script')
        if(elScript) document.body.removeChild(elScript)
        const newScript = document.createElement('script')
        newScript.onload = () => setTimeout(() => resolve(), 100)
        newScript.async = true
        newScript.id = 'main_script'
        newScript.src = script
        document.body.appendChild(newScript)
    })
}