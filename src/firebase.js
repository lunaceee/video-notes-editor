import { firebase } from '@firebase/app';
import '@firebase/firestore';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyATsmletLhA5xNmzGHMLtj6UgupDvL0U4M',
	authDomain: 'video-annotator-5a438.firebaseapp.com',
	databaseURL: 'https://video-annotator-5a438.firebaseio.com',
	projectId: 'video-annotator-5a438',
	storageBucket: 'video-annotator-5a438.appspot.com',
	messagingSenderId: '798874475731',
	appId: '1:798874475731:web:181aa5334e94053dc30826',
	measurementId: 'G-23MMSMGR0X'
});

export const db = firebaseApp.firestore();
