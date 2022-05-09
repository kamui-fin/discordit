/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites: async () => {
        return [
            {
                source: "/:hash",
                destination: "http://localhost:8080/:hash",
            },
        ]
    },
}

module.exports = nextConfig
