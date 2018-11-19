import React from 'react'
import PropTypes from 'prop-types'

class Table extends React.Component{
    static propTypes = {
        data: PropTypes.array,
        lengthPerPage: PropTypes.number,
        currentPage: PropTypes.number
    }
    componentDidMount(){
        const style = document.createElement('style')
        style.id = 'tableStyle'
        style.innerHTML = `
        table {
            border: none;
            width: 100%;
        }
        td {
            padding: 10px 10px;
        }
        tbody tr:nth-child(odd){
            background-color: #4C8BF5;
            color: #fff;
            border: none;
          }`
        document.body.appendChild(style)
    }
    render(){
        const { data, currentPage, lengthPerPage } = this.props
        console.log('log', Number(currentPage))
        console.log(Number(currentPage) - 1)
        const init = (Number(currentPage-1)  * lengthPerPage)
        const end = (Number(currentPage) * lengthPerPage)
        console.log(init, end)
        const trimData = data.slice(init,  end) 
        return (
            <table>
                <thead>
                    <tr>
                        <th style={{width: '10%'}}>ID</th>
                        <th style={{width: '10%'}}>User ID</th> 
                        <th style={{width: '80%'}}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { trimData && trimData.map((dt, index) => {
                        return <tr key={`list ${index}`}>
                            <td>{dt.id}</td>
                            <td>{dt.userId}</td>
                            <td>{dt.title}</td>
                        </tr>
                    })}               
                </tbody>
            </table>
        )
    }
}

export default Table