let componentName = null

process.argv.forEach(function (val, index, array) {
	if (index === 2) {
		componentName = val
	}
})

if (componentName) {

	let basePath = 'src/components/' + componentName

	let componentClassName = componentName.split('/').pop()

	let fs = require('fs');
	if (fs.existsSync(basePath)) {
		console.error(`Directory ${basePath} already exists`)
		return
	}

	fs.mkdirSync(basePath)
	// fs.mkdirSync(basePath + "/style")
	// fs.mkdirSync(basePath + "/style/img")

	let styleFile = `.${componentClassName} \{\n`
	styleFile += "\t\n"
	styleFile += "}"

	let componentFile = 'import React, {Component} from "react"\n'
	componentFile += 'import {connect} from "react-redux"\n'
	componentFile += 'import PropTypes from "prop-types"\n'
	componentFile += `import "./${componentClassName}.css"\n`
	componentFile += `\n`
	componentFile += `class ${componentClassName} extends Component {\n`
	componentFile += `\n`
	componentFile += `\trender() {\n`
	componentFile += `\t\treturn <div className="${componentClassName}">\n\t\t\t\n\t\t</div>\n`
	componentFile += `\t}\n`
	componentFile += `}\n`
	componentFile += `\n`

	componentFile += `${componentClassName}.propTypes = {\n\t\n}\n\n`

	componentFile += `function map(state) {\n`
	componentFile += `\treturn {\n`
	componentFile += `\n`
	componentFile += `\t}\n`
	componentFile += `}\n`
	componentFile += `\n`

	componentFile += `export default connect(map, {})(${componentClassName})\n`

	fs.writeFile(`${basePath}/${componentClassName}.js`, componentFile, function (err) {
		if (err) {
			return console.log(err)
		}
	})


	fs.writeFile(`${basePath}/${componentClassName}.scss`, styleFile, function (err) {
		if (err) {
			return console.log(err)
		}
	})

	console.log(`All done with ${componentName}`)
} else {
	console.error("No component name passed")
}
