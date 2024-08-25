import clsx from 'clsx'
import { User } from '../../../components/UsersBlock'
import classes from './UserCard.module.scss'
import { memo } from 'react'
import { Icon } from '../Icon/Icon'
import CatIcon from '../../assets/icons/Cat.svg'

interface UserCardProps {
	className?: string
	user: User
}

export const UserCard = memo((props: UserCardProps) => {
	const {
		className,
		user: {
			email,
			id,
			name,
			phone,
			photo,
			position,
			position_id
		}
	} = props
	return (
		<div className={clsx(classes.userCard, className)}>
			<div className={classes.photoWrapper}>
				{photo
					? <img
						src={photo}
						alt='user photo'
						className={classes.photo}
					/>
					: <Icon Svg={CatIcon} />
				}
			</div>
			<p className={clsx(classes.text, classes.name)}>{name}</p>
			<p className={classes.text}>
				{position}
			</p>
			<p className={classes.text}>
				{email}
			</p>
			<p className={classes.text}>
				{phone}
			</p>
		</div>
	)
})