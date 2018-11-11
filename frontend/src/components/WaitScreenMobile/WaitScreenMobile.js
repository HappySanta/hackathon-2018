import React, {Component} from 'react'
import './style/WaitScreenMobile.css';

export default class WaitScreenMobile extends Component {

    render() {
        let style = {
            height: this.props.deviceHeight
        }
        return <div className="WaitScreenMobile">
            <div style={style} className="WaitScreenMobile__wrapper">
                <div className="WaitScreenMobile__animation">
                    <div className="bg">
					</div>
                </div>
            </div>
			<img alt="" src="https://check.vkforms.ru/bg_green.jpg" style={{height: 1, width:1, opacity: 0}}/>
        </div>
    }
}
