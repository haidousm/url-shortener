module.exports = {
    content: ["**/*.html"],
    theme: {
        extend: {
            colors: {
                "mac-gray-30": "#1e1e1e",
                "mac-gray-44": "#2c2c2c",
                "mac-gray-74": "#474747",
                "mac-gray-117": "#757575",
                "mac-gray-176": "#b0b0b0",
            },
            boxShadow: { "xl-heavy": "0 0 12px #000" },
            fontFamily: {
                "mac-terminal":
                    'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
