<script setup lang="ts">
import AuthView from './views/auth.vue';
import MainView from './views/main.vue';

// uses
const firebase = useFirebase();

// states
const isLoggedIn = ref(false);

// lifecycle
onMounted(() => {
	firebase.auth.onAuthStateChanged((user) => {
		isLoggedIn.value = user != null;
	});
});
</script>

<template>
	<MainView v-if="isLoggedIn" />
	<AuthView v-else />
</template>
