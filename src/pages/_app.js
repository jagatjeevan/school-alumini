import Header from '../components/Header';
import { Provider as SchoolProvider } from '../context/schoolNameContext';
import { initFirebase } from '../firebase/fireStoreService';
import '../styles/globals.css';

function MyApp({ Component, pageProps, firebaseConfig }) {
  initFirebase(firebaseConfig);
  return (
    <SchoolProvider>
      <Header />
      <Component {...pageProps} />
    </SchoolProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  return { firebaseConfig };
};

export default MyApp
