import { memo } from 'react'
import classes from './Logo.module.scss'
import clsx from 'clsx'
import { Icon } from '../Icon/Icon'
import CatIcon from '../../assets/icons/Cat.svg'

interface LogoProps {
	className?: string
}

export const Logo = memo((props: LogoProps) => {
	const { className } = props
	return (
		<div className={clsx(classes.logo, className)}>
			<Icon
				Svg={CatIcon}
			/>
			<p>TESTTASK</p>
		</div>)
})
