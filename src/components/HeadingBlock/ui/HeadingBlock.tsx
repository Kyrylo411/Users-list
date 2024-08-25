import { ScrollNames } from '../../../shared/const/scrollNames'
import { Button } from '../../../shared/ui/Button/Button'
import { Title, TitleVariant } from '../../../shared/ui/Title/Title'
import classes from './HeadingBlock.module.scss'
import { memo } from 'react'
import { Link } from 'react-scroll'

const scrollOptions = {
	to: ScrollNames.SIGN_UP,
	spy: true,
	smooth: true,
	duration: 500,
}

export const HeadingBlock = memo(() => {
	return (
		<div className={classes.headingBlock}>
			<div className={classes.background}>
				<Title variant={TitleVariant.H1} className={classes.title}>Test assignment for front-end developer</Title>
				<p className={classes.text}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
				<Link aria-label='scroll to form block' {...scrollOptions}>
					<Button>Sign up</Button>
				</Link>

			</div>
		</div>
	)
})
