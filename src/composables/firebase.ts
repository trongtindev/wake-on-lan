import { defineStore } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

export const firebaseConfig = {
	apiKey: 'AIzaSyBK0eHUHxXRdOUDrul4fYA3STCIrPq_nTE',
	authDomain: 'trongtin-dev.firebaseapp.com',
	projectId: 'trongtin-dev',
	storageBucket: 'trongtin-dev.appspot.com',
	messagingSenderId: '363179202701',
	appId: '1:363179202701:web:e6387939b5629d95182ac4',
	measurementId: 'G-484BSMPK9E'
};

export const useFirebase = defineStore('useFirebase', () => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const analytics = getAnalytics(app);

	return { app, auth, firestore, analytics };
});
