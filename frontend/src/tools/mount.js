import ReactDOM from 'react-dom'

export default function mount(component, rootNodeId = 'root') {
	removeLoaderCenteringClass()
	let rootNode = document.getElementById(rootNodeId)
	if (window.reactMounted) {
		ReactDOM.unmountComponentAtNode(rootNode)
	}
	window.reactMounted = true
	ReactDOM.render(component, rootNode)
}

function removeLoaderCenteringClass() {
	document.body.parentNode.classList.remove('h')
}
