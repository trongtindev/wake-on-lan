<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// uses
const firebase = useFirebase();

// states
const state = ref<'' | 'login'>('');

// events
const onPressedLogin = () => {
	state.value = 'login';
	signInWithPopup(firebase.auth, new GoogleAuthProvider())
		.then((result) => {
			console.warn('result', result);
		})
		.catch((error) => {
			alert(error.message ?? error.toString());
		})
		.finally(() => {
			state.value = '';
		});
};
</script>

<template>
	<v-sheet class="w-100 h-100vh d-flex align-center justify-center">
		<v-sheet>
			<v-btn
				:disabled="state != ''"
				:loading="state == 'login'"
				text="Login with Google"
				@click="onPressedLogin"
			/>
		</v-sheet>
	</v-sheet>
</template>
