import clsx from 'clsx'
import classes from './Title.module.scss'
import { memo, ReactNode } from 'react'

export enum TitleVariant {
	H1 = 'h1',
	H2 = 'h2'
}

interface TitleProps {
	className?: string
	variant: TitleVariant
	children: ReactNode
}


export const Title = memo((props: TitleProps) => {
	const { className, variant = TitleVariant.H1, children } = props

	const setTitle = () => {
		switch (variant) {
			case TitleVariant.H1: {
				return <h1 className={clsx(classes.title, className)}>{children}</h1>
			}
			case TitleVariant.H2: {
				return <h2 className={clsx(classes.title, className)}>{children}</h2>
			}
			default: {
				break
			}
		}
	}

	return setTitle()
})
