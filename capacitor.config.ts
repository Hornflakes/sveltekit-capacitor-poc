import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.example.app',
	appName: 'sveltekit-capacitor-poc',
	webDir: 'build',
	server: {
		androidScheme: 'https',
		allowNavigation: ['*.leafletjs.com'],
		url: 'http://10.0.2.2:5173',
		cleartext: true
	}
};

export default config;
