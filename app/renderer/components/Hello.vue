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
				msg: 'Hello Vue!',
			};
		},

		mounted() {

			const nfc = new NFC();

			nfc.on('reader', reader => {

				console.log(`${reader.reader.name}  device attached`);

				reader.on('card', card => {
					console.log(`${reader.reader.name}  card detected`, card);
				});

			});

		}

	};

</script>

<style scoped>
	h1 {
		color: #42b983;
	}
</style>
