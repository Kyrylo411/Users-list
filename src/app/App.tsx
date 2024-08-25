import { MainPage } from '../pages/MainPage'
import { BASE_URL } from '../shared/const/baseUrl'
import { Header } from '../widgets/Header'
import './styles/index.scss'
import { Suspense, useEffect } from 'react'

const getToken = async () => {
	const token = localStorage.getItem('test_task_token')
	const data = await (await fetch(`${BASE_URL}/token`)).json()
	localStorage.setItem('test_task_token', data.token)
}

function App() {
	useEffect(() => {
		getToken()
	}, [])

	return (
		<div className='app'>
			<Suspense fallback=''>
				<Header />
				<MainPage />
			</Suspense>
		</div>
	)
}

export default App