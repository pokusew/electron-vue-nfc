<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
	</div>
</template>

<script>

	import { NFC } from 'nfc-pcsc';

	export default {

		data() {
			return {
				nfc: null,
				readers: null,
				msg: 'Hello electron-vue-nfc!',
			};
		},

		created() {
			console.log('created', this);
		},

		mounted() {
			console.log('mounted', this);

			this.nfc = new NFC();
			this.readers = new Set();
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

			this.nfc.on('reader', reader => {

				console.log(`${reader.name} reader attached, waiting for cards ...`);
				this.readers.add(reader);

				reader.on('card', card => {
					console.log(`card ${card.uid}`);
				});

				reader.on('error', err => {
					console.error(`reader error`, err);
				});

				reader.on('end', () => {
					console.log(`${reader.name} reader disconnected.`);
				});

			});

			this.nfc.on('error', err => {
				console.error(err);
			});

		},

		updated() {
			console.log('updated', this);
		},

		destroyed() {

			// stops listening for new readers
			this.nfc.close();

			this.readers.forEach(reader => {
				// stops listening for reader status changes, reader emits 'end' event
				reader.close();
			});

		},

	};

</script>

<style scoped>

	h1 {
		color: #42b983;
	}

</style>
