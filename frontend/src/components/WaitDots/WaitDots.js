import React, {Component} from 'react'
import './WaitDots.css'

export default class WaitDots extends Component {
    render() {
        let {blue} = this.props
        return (
			<span className={"WaitDots" + ( blue ? " blue" : "" ) }>
                <span className="dot dot1" />
                <span className="dot dot2" />
                <span className="dot dot3" />
            </span>
        )
    }
}