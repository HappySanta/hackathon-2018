import React, {Component} from 'react'
import L from "../../lang/L"
import './Cover.css'

export default class Cover extends Component {

	render() {
		let {text, height} = this.props
		return (
			<div className="Cover" style={height ? {minHeight: height} : {}}>
				<div className="Cover__content">
                    <div className="Cover__icon">
                    </div>
                    {text || L.t('only_for_groups')}
				</div>
			</div>
		)
	}
}
