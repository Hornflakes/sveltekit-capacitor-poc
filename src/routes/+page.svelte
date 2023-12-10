<script>
	import roll from '$lib/assets/roll.gif';
	import { Heading } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { Geolocation } from '@capacitor/geolocation';
	import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

	let fileData, loc;

	async function readDummyTextFile() {
		let file;
		try {
			file = await Filesystem.readFile({
				path: 'dummy.txt',
				directory: Directory.Data,
				encoding: Encoding.UTF8
			});
			fileData = file.data;
			return file;
		} catch (e) {
			await Filesystem.writeFile({
				path: 'dummy.txt',
				data: 'This is a dummy text file.',
				directory: Directory.Data,
				encoding: Encoding.UTF8
			});
			readDummyTextFile();
		}
	}

	onMount(async () => {
		readDummyTextFile();
		Geolocation.watchPosition({}, (location) => (loc = location));
	});
</script>

<Heading tag="h1" class="my-5">Welcome!</Heading>
<img src={roll} alt="never gonna give you up" />

<Heading tag="h2" class="my-5">{fileData}</Heading>

<Heading tag="h2">Geolocation</Heading>
<p>Your location is:</p>
<p>Latitude: {loc ? loc.coords.latitude : 'Getting location...'}</p>
<p>Longitude: {loc ? loc.coords.longitude : 'Getting location...'}</p>

<style>
	img {
		max-height: calc(100vh - 12rem);
	}
</style>
