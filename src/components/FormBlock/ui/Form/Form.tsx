import { BASE_URL } from '../../../../shared/const/baseUrl'
import { Button } from '../../../../shared/ui/Button/Button'
import { Input } from '../../../../shared/ui/Input/Input'
import { Loader } from '../../../../shared/ui/Loader/Loader'
import { Position } from '../../types'
import { validateForm } from '../../validateForm'
import classes from './Form.module.scss'
import { useState } from 'react'
import { Popup } from '../../../../shared/ui/Popup/Popup'

interface FormProps {
	positions: Position[];
	isLoading: boolean;
	setIsNewUserAdded?: (isAdded: boolean) => void
}

export const Form = (props: FormProps) => {
	const { positions, isLoading, setIsNewUserAdded } = props
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [photo, setPhoto] = useState<File | null>(null);
	const [position, setPosition] = useState<string | null>(null);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSuccess, setIsSuccess] = useState(false)

	const disabled = Object.values(errors).length > 0 || (!name || !email || !phone || !position || !photo)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = validateForm(name, email, phone, position, photo);
		setErrors(newErrors);

		if (Object.keys(newErrors).length !== 0) return;

		const token = localStorage.getItem('test_task_token');

		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('phone', phone);
		formData.append('position_id', String(position));
		formData.append('photo', photo);

		try {
			const response = await fetch(`${BASE_URL}/users`, {
				method: 'POST',
				headers: {
					Token: `${token}`,
				},
				body: formData,
			});

			if (response.ok) {
				console.log('Form submitted successfully!');
				setIsNewUserAdded(true)
				setName('')
				setEmail('')
				setPhone('')
				setPhoto(null)
				setPosition(null)
				setIsSuccess(true)
			} else {
				console.error('Failed to submit form');
			}
		} catch (err) {
			console.error('ERROR', err);
		}
	};

	const handleNameChange = (e: string) => {
		setName(e)
		setErrors({})
	}
	const handleEmailChange = (e: string) => {
		setEmail(e)
		setErrors({})
	}
	const handlePhoneChange = (e: string) => {
		setPhone(e)
		setErrors({})
	}
	const handlePositionChange = (e: string) => {
		setPosition(e)
		setErrors({})
	}
	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setPhoto(e.target.files[0]);
			setErrors({})
		}
	};

	const handlePopupClose = () => {
		setIsSuccess(false)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Popup message='Success!' isOpen={isSuccess} onClose={handlePopupClose} />
			<div className={classes.inputsWrapper}>
				<Input
					onChange={handleNameChange}
					className={classes.input}
					placeholder='Your name'
					id='name'
					name='name'
					value={name}
					additionalText={errors.name}
					error={!!errors.name}
				/>
				<Input
					onChange={handleEmailChange}
					placeholder='Email'
					className={classes.input}
					type='email'
					id='email'
					name='email'
					value={email}
					additionalText={errors.email}
					error={!!errors.email}
				/>
				<Input
					onChange={handlePhoneChange}
					name='phone'
					placeholder='Phone'
					id='phone'
					type='tel'
					className={classes.input}
					additionalText={errors.phone ? errors.phone : '+38 (XXX) XXX - XX - XX'}
					value={phone}
					error={!!errors.phone}
				/>
			</div>
			{isLoading && <Loader />}
			<div className={classes.radioWrapper}>
				<p>Select your position</p>
				{positions.length && positions.map(position => (
					<div key={position.id} className={classes.radioButton} >
						<Input
							id={String(position.id)}
							value={position.id}
							type='radio'
							name='position'
							onChange={handlePositionChange}
						/>
						<label htmlFor={String(position.id)}>
							{position.name}
						</label>
					</div>
				))}
				{errors.position && <span className={classes.error}>{errors.position}</span>}
			</div>
			<div className={classes.fileLoaderWrapper}>
				<div className={classes.innerWrapper}>
					<input
						type='file'
						placeholder='Upload your photo'
						accept="image/png, image/jpeg"
						name='photo'
						id='file-upload'
						onChange={handlePhotoChange}
					/>
					<label htmlFor="file-upload" className={classes.inputFile}>
						Upload
					</label>
					{photo
						? <div className={classes.filePlaceholder}>
							Photo uploaded successfully
						</div> :
						<div className={classes.filePlaceholder}>
							Upload your photo
						</div>
					}
				</div>
				{errors.photo && <span className={classes.error}>{errors.photo}</span>}
			</div>
			<Button disabled={disabled} type='submit'>Sign up</Button>
		</form >
	)
}
