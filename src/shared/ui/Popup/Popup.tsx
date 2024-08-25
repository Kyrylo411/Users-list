import clsx from 'clsx';
import classes from './Popup.module.scss';
import { memo, useEffect } from 'react';
import Cross from '../../assets/icons/Cross.svg'
import { Button } from '../Button/Button';

export enum PopupType {
	ERROR = 'error',
	INFO = 'info'
}

interface Props {
	message: string;
	isOpen: boolean;
	onClose: () => void;
	type?: PopupType
}

export const Popup = memo((props: Props) => {
	const { isOpen, message, onClose, type = PopupType.INFO } = props

	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				onClose();
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={clsx(classes.popupOverlay, { [classes.error]: type === PopupType.ERROR })}>
			<p>{message}</p>
			<Button onClick={onClose} className={classes.btn}><Cross /></Button>
		</div>
	);
})
