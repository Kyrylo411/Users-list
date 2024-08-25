import clsx from 'clsx'
import classes from './Input.module.scss'
import { InputHTMLAttributes, memo } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string | number
	onChange?: (value: string) => void
	type?: string
	placeholder?: string
	additionalText?: string
	error?: boolean
}


export const Input = memo((props: InputProps) => {
	const {
		className,
		onChange,
		value,
		type = 'text',
		placeholder,
		additionalText,
		error,
		...otherProps
	} = props

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<div className={clsx(classes.inputWrapper, className)}>
			<input
				className={classes.input}
				type={type}
				value={value}
				onChange={onInputChange}
				placeholder={placeholder}
				{...otherProps}
			/>
			{
				additionalText &&
				<span className={clsx(classes.additionalText, { [classes.error]: error })}>{additionalText}</span>
			}
		</div >)
})
