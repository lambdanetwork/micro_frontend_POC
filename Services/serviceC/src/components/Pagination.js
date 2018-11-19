import React from 'react'
import PropTypes from 'prop-types'
import { inherits } from 'util';

class Pagination extends React.Component{
    static propTypes = {
        onPrevClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onNumberClick: PropTypes.func,
        totalPages: PropTypes.number,
        currentPage: PropTypes.number,

    }
    render(){
        const { totalPages, onPrevClick, onNextClick, onNumberClick } = this.props
        let num = []
        for(let i=1; i<=totalPages; i++){
            const isSelected = this.props.currentPage === i;
            num.push(
                <span key={`page ${i}`}
                    onClick={onNumberClick.bind(this, i)} 
                    style={{margin: '0 2px', cursor: 'pointer', color: isSelected ? 'red' :'inherit'}}>
                    {i}
                </span>
            )
        }
        return (
            <div>
                <span style={{cursor: 'pointer', margin: '0 2px'}} onClick={onPrevClick}>{'<'}</span>
                {num}
                <span style={{cursor: 'pointer', margin: '0 2px'}} onClick={onNextClick}>{'>'}</span>
            </div>
        )
    }
}

export default Pagination