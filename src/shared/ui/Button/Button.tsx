import classes from './Button.module.scss'
import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	disabled?: boolean
	children: ReactNode
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		disabled,
		...otherProps
	} = props
	return (
		<button
			type='button'
			className={clsx(classes.btn, className, { [classes.disabled]: disabled })}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>)
})
