/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["via.placeholder.com", "fakeimg.pl"],
    },
    sassOptions: {
        includePaths: ["@"],
    },
};

module.exports = nextConfig;
