/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	experimental: {
		optimizePackageImports: ['react-icons', 'lucide-react'],
	},
};

module.exports = nextConfig;
