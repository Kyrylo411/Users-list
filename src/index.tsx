import ReactDOM from 'react-dom/client';
import App from './app/App';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>
)