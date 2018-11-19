import React from 'react'

class LeftMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hover: null
        }
    }
    render(){
        return (
            <div
                onMouseLeave={() => this.setState({hover:null})}
                style={{display: 'flex', flexDirection: 'column', marginRight: 10}}>
                {
                    ['/Home', '/NestedFragments', '/List'].map((pathname, index) => {
                        const isHover = this.state.hover === index || window.location.pathname.indexOf(pathname) >= 0
                        return (
                            <div
                                onMouseEnter={this.onHover.bind(this, index)}
                                className='select' 
                                style={{padding: '10px 10px', marginBottom: 6, cursor: 'pointer', backgroundColor: isHover ? 'lightblue' : 'white'}}
                                onClick={this.props.routeToPage.bind(this, pathname)}
                            >{pathname.slice(1) + ' > '}</div>
                        )
                    })
                }
            </div>
        )
    }
    onHover(index, e){
        e.preventDefault()
        this.setState({hover:index})
    }
}

if(typeof window !== 'undefined' || typeof window !== 'null'){
    window.LEFTMENU = LeftMenu
}
export default LeftMenu