import { memo } from 'react'
import classes from './Icon.module.scss'
import clsx from 'clsx'

interface IconProps {
	className?: string
	Svg: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo((props: IconProps) => {
	const { className, Svg } = props

	return (
		<Svg
			className={clsx(classes.icon, className)}
		/>
	)
})
