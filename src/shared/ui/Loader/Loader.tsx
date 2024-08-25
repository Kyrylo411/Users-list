import './Loader.scss'
import clsx from 'clsx';

interface LoaderProps {
	className?: string;
}

export function Loader({ className }: LoaderProps) {
	return (
		<div className={clsx('lds-default', {}, [className])}>
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}
