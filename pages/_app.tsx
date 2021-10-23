import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import StorageManager from '../backend/StorageManager';

const GlobalStorageManager = new StorageManager();

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
export default MyApp;
export { GlobalStorageManager };
