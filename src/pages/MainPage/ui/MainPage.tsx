import classes from './MainPage.module.scss'
import { UsersBlock } from '../../../components/UsersBlock'
import { HeadingBlock } from '../../../components/HeadingBlock'
import { FormBlock } from '../../../components/FormBlock'
import { useState } from 'react'

export const MainPage = () => {
	const [isNewUserAdded, setIsNewUserAdded] = useState(false)
	return (
		<div className={classes.mainPage}>
			<HeadingBlock />
			<UsersBlock isNewUserAdded={isNewUserAdded} setIsNewUserAdded={setIsNewUserAdded} />
			<FormBlock setIsNewUserAdded={setIsNewUserAdded} />
		</div>
	)
}
