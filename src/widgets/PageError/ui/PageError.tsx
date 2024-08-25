import classes from './PageError.module.scss'

export function PageError() {
	const reload = () => {
		window.location.reload()
	}
	return (
		<div className={classes.PageError}>
			<h1 className={classes.title}>Something went wrong</h1>
			<button className={classes.button} onClick={reload}>reload page</button>
		</div>
	)
}

