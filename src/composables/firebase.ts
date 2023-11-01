import { defineStore } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

export const firebaseConfig = {
	apiKey: 'AIzaSyDAus7LtEmo3fYzAKHM6Yf_f8qqU7rj3eU',
	authDomain: 'vazo-growth.firebaseapp.com',
	projectId: 'vazo-growth',
	storageBucket: 'vazo-growth.appspot.com',
	messagingSenderId: '90290616083',
	appId: '1:90290616083:web:3b3aac235d3bb785a04ce6',
	measurementId: 'G-JP1CCCF5FS'
};

export const useFirebase = defineStore('useFirebase', () => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const firestore = getFirestore(app);
	const analytics = getAnalytics(app);

	return { app, auth, firestore, analytics };
});
