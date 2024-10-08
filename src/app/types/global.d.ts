declare module '*.scss' {
	interface IClassNames {
		[className: string]: string
	}
	const classnames: IClassNames;
	export = classnames;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare module '*.svg' {
	import React from 'react'

	const SVG: React.FC<React.SVGAttributes<SVGElement>>
	export default SVG
}