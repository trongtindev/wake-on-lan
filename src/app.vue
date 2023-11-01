<script setup lang="ts">
import AuthView from './views/auth.vue';
import MainView from './views/main.vue';

// uses
const firebase = useFirebase();

// computed
const isLoggedIn = computed(() => {
	return firebase.auth.currentUser != null;
});
</script>

<template>
	<MainView v-if="isLoggedIn" />
	<AuthView v-else />
</template>
