import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    skipWaiting: true,
});

export default withPWA({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    webpack(config) {
        // Disable CSS minimization to help troubleshoot the issue
        config.optimization.minimize = false;

        // Disable CSSNano plugin directly if it is still being used
        config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== "CssMinimizerPlugin");

        return config;
    },
});
