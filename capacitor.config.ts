import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.example.app',
	appName: 'sveltekit-capacitor-poc',
	webDir: 'build',
	server: {
		androidScheme: 'https',
		allowNavigation: ['*.leafletjs.com']
	}
};

export default config;
