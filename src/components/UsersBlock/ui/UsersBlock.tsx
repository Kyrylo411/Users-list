import { useCallback, useEffect, useState } from 'react'
import classes from './UsersBlock.module.scss'
import { User } from '../types/user'
import { UserCard } from '../../../shared/ui/UserCard/UserCard'
import { Button } from '../../../shared/ui/Button/Button'
import { BASE_URL } from '../../../shared/const/baseUrl'
import { Title, TitleVariant } from '../../../shared/ui/Title/Title'
import { Element } from 'react-scroll'
import { ScrollNames } from '../../../shared/const/scrollNames'
import { Loader } from '../../../shared/ui/Loader/Loader'

interface Props {
	isNewUserAdded?: boolean
	setIsNewUserAdded: (isAdded: boolean) => void
}

export const UsersBlock = ({ isNewUserAdded, setIsNewUserAdded }: Props) => {
	const [users, setUsers] = useState<User[]>([])
	const [page, setPage] = useState(1)
	const [totalUsers, setTotalUsers] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const hasMore = users.length < totalUsers

	const fetchUsers = async () => {
		try {
			const data = await (await fetch(`${BASE_URL}/users?page=${page}&count=6`)).json()
			setUsers(prev => [...prev, ...data.users])
			setTotalUsers(data.total_users)
		} catch (err) {
			console.error('ERROR', err)
		}
	}

	const fetchUpdatedUsers = async () => {
		try {
			setIsLoading(true)
			const data = await (await fetch(`${BASE_URL}/users?page=1&count=6`)).json()
			setUsers(data.users)
			setTotalUsers(data.total_users)
			setIsNewUserAdded(false)
		} catch (err) {
			console.error('ERROR', err)
		} finally {
			setIsLoading(false)
		}
	}
	const showMoreClick = useCallback(() => {
		setPage(prev => prev + 1)
	}, [])

	useEffect(() => {
		fetchUsers()
	}, [page])

	useEffect(() => {
		if (isNewUserAdded) {
			fetchUpdatedUsers()
		}
	}, [isNewUserAdded])



	return (
		<div className={classes.usersBlock}>
			<Element id={ScrollNames.USERS_BLOCK_ID} name={ScrollNames.USERS_BLOCK} />
			<Title variant={TitleVariant.H2}>Working with GET request</Title>
			{isLoading
				? <Loader />
				: <div className={classes.cardsWrapper}>
					{users.length ? users.map(user => (
						<UserCard user={user} key={user.id} />
					)) : null}
				</div>
			}
			{hasMore &&
				<Button
					onClick={showMoreClick}>
					Show more
				</Button>
			}
		</div>
	)
}




