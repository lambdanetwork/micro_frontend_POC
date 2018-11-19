import React from 'react'
import PropTypes from 'prop-types'
import Table from './components/Table';
import Pagination from './components/Pagination';


class ServiceC extends React.PureComponent{
    static propTypes = {
        inputValue: PropTypes.string
    }

    constructor(props){
        super(props)
        this.lengthPerPage = 8
        this.state = {
            list: [],
            currentPage: 1,
            totalPages: 0
        }
    }

    componentDidMount(){
        const httpAddress = 'https://jsonplaceholder.typicode.com/posts'

        fetch(httpAddress)
        .then(res => res.json())
        .then(list => {
            const totalPages = Math.ceil(list.length/this.lengthPerPage)
            this.setState({list, totalPages})
        })
    }
    render(){
        return (
            <div style={{display: 'flex'}}>
                <div style={{width: '100%'}}>
                    <h2>{this.props.inputValue} List of Items With Pagination</h2>
                    <Table 
                        lengthPerPage={this.lengthPerPage}
                        currentPage={this.state.currentPage}
                        data={this.state.list}
                    />
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                        <Pagination 
                            totalPages={this.state.totalPages}
                            currentPage={this.state.currentPage}
                            onPrevClick={this.onPrevClick.bind(this)}
                            onNextClick={this.onNextClick.bind(this)}
                            onNumberClick={this.onNumberClick.bind(this)}
                        />
                    </div>
                </div>
                <br />  
            </div>
        )
    }

    onNextClick(e){
        const { currentPage, totalPages } = this.state
        e.preventDefault()
        const nextPage = currentPage === totalPages ? 0 : currentPage+1
        this.setState({currentPage: nextPage})
    }
    onPrevClick(e){
        const { currentPage, totalPages } = this.state
        e.preventDefault()
        const prevPage = currentPage === 0 ? totalPages : currentPage-1
        this.setState({currentPage: prevPage})
    }
    onNumberClick(number){
        this.setState({ currentPage: number})
    }
}

if(typeof window !== 'undefined' || typeof window !== 'null'){
    window.MAINBODY = ServiceC
}
export default ServiceC



