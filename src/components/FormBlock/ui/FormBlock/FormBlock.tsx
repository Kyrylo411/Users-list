import { Element } from 'react-scroll'
import { BASE_URL } from '../../../../shared/const/baseUrl'
import { Title, TitleVariant } from '../../../../shared/ui/Title/Title'
import { Position } from '../../types'
import { Form } from '../Form/Form'
import classes from './FormBlock.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { ScrollNames } from '../../../../shared/const/scrollNames'

interface FormBlockProps {
	className?: string
	setIsNewUserAdded?: (isAdded: boolean) => void
}

export const FormBlock = (props: FormBlockProps) => {
	const { setIsNewUserAdded } = props
	const [isLoading, setIsLoading] = useState(false)
	const [positions, setPositions] = useState<Position[]>([])

	const getPositions = async () => {
		try {
			setIsLoading(true)
			const data = await (await fetch(`${BASE_URL}/positions`)).json()
			setPositions(data.positions)
		} catch (err) {
			console.log('ERROR', err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getPositions()
	}, [])

	return (
		<div className={classes.formBlock}>
			<Element name={ScrollNames.SIGN_UP} id={ScrollNames.SIGN_UP} />
			<Title
				variant={TitleVariant.H2}
			>
				Working with POST request
			</Title>
			<Form
				isLoading={isLoading}
				positions={positions}
				setIsNewUserAdded={setIsNewUserAdded}
			/>
		</div>
	)
}




