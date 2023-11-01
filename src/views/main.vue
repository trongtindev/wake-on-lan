<script setup lang="ts">
import axios from 'axios';
import { getDoc, setDoc, doc } from 'firebase/firestore';

// uses
const firebase = useFirebase();

// states
const state = ref<'' | 'wake' | 'update'>('');
const mac = ref('');
const ipv4 = ref('');
const successfully = ref(false);

// events
const onPressedWake = async () => {
	state.value = 'wake';
	axios
		.post(
			'api/wake',
			{
				mac: mac.value,
				ipv4: ipv4.value
			},
			{
				headers: {
					authorization: `Bearer ${await user.value.getIdToken()}`
				}
			}
		)
		.then(() => {
			successfully.value = true;
		})
		.catch((error) => {
			alert(error.message ?? error.toString());
		})
		.finally(() => {
			state.value = '';
		});
};

const onPressedUpdate = () => {
	state.value = 'update';
	setDoc(doc(firebase.firestore, profileRef.value), {
		mac: mac.value,
		ipv4: ipv4.value
	})
		.then(() => {
			successfully.value = true;
		})
		.catch()
		.finally(() => {
			state.value = '';
		});
};

// functions
const loadProfiles = () => {
	getDoc(doc(firebase.firestore, profileRef.value))
		.then((result) => {
			const data = result.data() ?? {};
			mac.value = data.mac ?? '';
			ipv4.value = data.ipv4 ?? '';
		})
		.catch();
};

// computed
const user = computed(() => {
	return firebase.auth.currentUser!;
});
const profileRef = computed(() => {
	return `wol/profiles/${user.value.uid}/default`;
});

const cannotWake = computed(() => {
	return mac.value.length === 0 || ipv4.value.length === 0;
});

// lifecycle
onMounted(() => loadProfiles());
</script>

<template>
	<div>
		<v-sheet class="w-100 h-100vh d-flex align-center justify-center">
			<v-card :width="480">
				<v-card-title class="text-center"> Wake On Land </v-card-title>
				<v-card-subtitle class="text-center">Controller WOL client</v-card-subtitle>
				<v-card-text>
					<v-text-field
						v-model="mac"
						:disabled="state != ''"
						label="MAC"
						placeholder="AA:BB:CC:DD:EE:FF"
						variant="outlined"
					/>
					<v-text-field
						v-model="ipv4"
						:disabled="state != ''"
						label="IPv4"
						placeholder="192.168.0.255"
						:hide-details="true"
						variant="outlined"
					/>
				</v-card-text>

				<v-divider />
				<v-card-actions class="d-flex justify-end">
					<v-row>
						<v-col>
							<v-btn
								variant="outlined"
								:block="true"
								:disabled="state != ''"
								:loading="state == 'update'"
								text="Update"
								@click="onPressedUpdate"
							/>
						</v-col>

						<v-col>
							<v-btn
								variant="flat"
								:block="true"
								:disabled="state != '' || cannotWake"
								:loading="state == 'wake'"
								text="Wake"
								@click="onPressedWake"
							/>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-sheet>

		<v-snackbar v-model="successfully"> Successfully! </v-snackbar>
	</div>
</template>
