import { memo } from 'react'
import classes from './Header.module.scss'
import clsx from 'clsx'
import { Logo } from '../../../shared/ui/Logo/Logo'
import { Button } from '../../../shared/ui/Button/Button'
import { Link } from 'react-scroll'
import { ScrollNames } from '../../../shared/const/scrollNames'

const scrollOptions = {
	spy: true,
	smooth: true,
	duration: 500,
}
interface HeaderProps {
	className?: string
}

export const Header = memo((props: HeaderProps) => {
	const { className } = props
	return (
		<div className={clsx(classes.header, className)}>
			<div className={classes.innerWrapper}>
				<Logo />
				<div className={classes.buttonsWrapper}>
					<Link aria-label='scroll users block' {...scrollOptions} to={ScrollNames.USERS_BLOCK} href={ScrollNames.USERS_BLOCK}>
						<Button>Users</Button>
					</Link>
					<Link aria-label='scroll to form block' {...scrollOptions} to={ScrollNames.SIGN_UP} href={ScrollNames.SIGN_UP}>
						<Button>Sign up</Button>
					</Link>
				</div>
			</div>
		</div >)
})
