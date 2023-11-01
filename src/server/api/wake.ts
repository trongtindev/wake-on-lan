import admin from 'firebase-admin';

export default defineEventHandler(async (event) => {
	const serviceAccount = JSON.parse(
		process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
	);
	if (!admin.apps || admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
		});
	}

	const token = event.node.req.headers?.authorization?.split(' ')[1];
	const decodedToken = await admin.auth().verifyIdToken(token ?? '');

	const body: { mac: string, ipv4: string; } = await readBody(event);
	const result = await admin.messaging().sendToTopic(`wol.${decodedToken.uid}`, {
		data: body
	});

	return {
		data: result,
		message: 'OK'
	};
});
