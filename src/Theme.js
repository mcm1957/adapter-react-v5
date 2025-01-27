import { createTheme, adaptV4Theme, alpha } from '@mui/material/styles';

import { orange, grey } from '@mui/material/colors';

const step = (16 - 5) / 23 / 100;

/**
 * Convert hex color in the format '#rrggbb' or '#rgb' to an RGB object.
 * @param {string} hex
 * @returns {{r: number, g: number, b: number}}
 */
function toInt(hex) {
    const rgb = {
        r: 0,
        g: 0,
        b: 0,
    };

    if (hex.length === 7) {
        rgb.r = parseInt(hex.substr(1, 2), 16);
        rgb.g = parseInt(hex.substr(3, 2), 16);
        rgb.b = parseInt(hex.substr(5, 2), 16);
    } else if (hex.length === 4) {
        const r = hex.substr(1, 1);
        const g = hex.substr(2, 1);
        const b = hex.substr(3, 1);

        rgb.r = parseInt(r + r, 16);
        rgb.g = parseInt(g + g, 16);
        rgb.b = parseInt(b + b, 16);
    }

    return rgb;
}

/**
 * Convert an RGB object to a hex color string in the format '#rrggbb'.
 * @param {{r: number, g: number, b: number}} int
 * @returns {string}
 */
function toHex(int) {
    return `#${Math.round(int.r).toString(16)}${Math.round(int.g).toString(16)}${Math.round(int.b).toString(16)}`;
}

/**
 * @param {string} color color in the format '#rrggbb' or '#rgb'
 * @param {string} overlayColor overlay color in the format '#rrggbb' or '#rgb'
 * @param {number} elevation elevation as an integer starting with 1
 * @returns {string} the hex color string in the format '#rrggbb'
 */
function getElevation(color, overlayColor, elevation) {
    const rgb = toInt(color);
    const overlay = toInt(overlayColor);

    rgb.r += overlay.r * (0.05 + step * (elevation - 1));
    rgb.g += overlay.g * (0.05 + step * (elevation - 1));
    rgb.b += overlay.b * (0.05 + step * (elevation - 1));

    return toHex(rgb);
}

/**
 * Get all 24 elevations of the given color and overlay.
 * @param {string} color color in the format '#rrggbb' or '#rgb'
 * @param {string} overlay overlay color in the format '#rrggbb' or '#rgb'
 * @returns {import('@mui/material/styles/withStyles').CSSProperties}
 */
function getElevations(color, overlay) {
    /** @type {import('@mui/material/styles/withStyles').CSSProperties} */
    const elevations = {};

    for (let i = 1; i <= 24; i++) {
        elevations[`elevation${i}`] = {
            backgroundColor: getElevation(color, overlay, i),
        };
    }

    return elevations;
}

const buttonsPalette = () => ({
    palette: {
        // mode: "dark",
        grey: {
            main: grey[300],
            dark: grey[400],
        },
    },
});

const buttonsTheme = theme => ({
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained', color: 'grey' },
                    style: {
                        color: theme.palette.getContrastText(theme.palette.grey[300]),
                    },
                },
                {
                    props: { variant: 'outlined', color: 'grey' },
                    style: {
                        color: theme.palette.text.primary,
                        borderColor:
                            theme.palette.mode === 'light'
                                ? 'rgba(0, 0, 0, 0.23)'
                                : 'rgba(255, 255, 255, 0.23)',
                        '&.Mui-disabled': {
                            border: `1px solid ${theme.palette.action.disabledBackground}`,
                        },
                        '&:hover': {
                            borderColor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(0, 0, 0, 0.23)'
                                    : 'rgba(255, 255, 255, 0.23)',
                            backgroundColor: alpha(
                                theme.palette.text.primary,
                                theme.palette.action.hoverOpacity,
                            ),
                        },
                    },
                },
                {
                    props: { color: 'grey', variant: 'text' },
                    style: {
                        color: 'black',
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.text.primary,
                                theme.palette.action.hoverOpacity,
                            ),
                        },
                    },
                },
            ],
        },
    },
});

/**
 * The theme creation factory function.
 * @param {string} type
 * @returns {import('./types').Theme}
 */
const Theme = type => {
    let theme;
    if (type === 'dark') {
        theme = {
            name: type,
            palette: {
                mode: 'dark',
                background: {
                    paper: '#121212',
                    default: '#121212',
                },
                primary: {
                    main: '#4dabf5',
                },
                secondary: {
                    main: '#436a93',
                },
                expert: '#14bb00',
                text: {
                    primary: '#ffffff',
                    secondary: '#ffffff',
                },
            },
            overrides: {
                MuiAppBar: {
                    colorDefault: {
                        backgroundColor: '#272727',
                    },
                },
                MuiLink: {
                    root: {
                        textTransform: 'uppercase',
                        transition: 'color .3s ease',
                        color: orange[200],
                        '&:hover': {
                            color: orange[100],
                        },
                    },
                },
                MuiPaper: getElevations('#121212', '#fff'),
            },
        };
    } else if (type === 'blue') {
        theme = {
            name: type,
            palette: {
                mode: 'dark',
                background: {
                    paper: '#151d21',
                    default: '#151d21',
                },
                primary: {
                    main: '#4dabf5',
                },
                secondary: {
                    main: '#436a93',
                },
                expert: '#14bb00',
                text: {
                    primary: '#ffffff',
                    secondary: '#ffffff',
                },
            },
            overrides: {
                MuiAppBar: {
                    colorDefault: {
                        backgroundColor: '#2a3135',
                    },
                },
                MuiLink: {
                    root: {
                        textTransform: 'uppercase',
                        transition: 'color .3s ease',
                        color: orange[200],
                        '&:hover': {
                            color: orange[100],
                        },
                    },
                },
                MuiPaper: getElevations('#151d21', '#fff'),
            },
        };
    } else if (type === 'colored') {
        theme = {
            name: type,
            palette: {
                mode: 'light',
                primary: {
                    main: '#3399CC',
                },
                secondary: {
                    main: '#164477',
                },
                expert: '#96fc96',
            },
            overrides: {
                MuiAppBar: {
                    colorDefault: {
                        backgroundColor: '#3399CC',
                    },
                },
                MuiLink: {
                    root: {
                        textTransform: 'uppercase',
                        transition: 'color .3s ease',
                        color: orange[400],
                        '&:hover': {
                            color: orange[300],
                        },
                    },
                },
            },
        };
    } else if (type === 'PT') {
        theme = {
            name: type,
            palette: {
                mode: 'light',
                primary: {
                    main: '#0F99DE',
                },
                secondary: {
                    main: '#88A536',
                },
                expert: '#BD1B24',
            },
            overrides: {
                MuiAppBar: {
                    colorDefault: {
                        backgroundColor: '#0F99DE',
                    },
                },
                MuiLink: {
                    root: {
                        textTransform: 'uppercase',
                        transition: 'color .3s ease',
                        color: orange[400],
                        '&:hover': {
                            color: orange[300],
                        },
                    },
                },
            },
        };
    } else if (type === 'DX') {
        theme = {
            name: type,
            palette: {
                mode: 'light',
                primary: {
                    main: '#F5F5F7',
                },
                secondary: {
                    main: '#a9a9a9',
                },
                expert: '#BD1B24',
                text: {
                    primary: '#007AFE',
                    secondary: '#007AFE',
                    disabled: '#007AFEAA',
                },
            },
            overrides: {
                MuiAppBar: {
                    colorDefault: {
                        backgroundColor: '#a9a9a9',
                    },
                },
                MuiLink: {
                    root: {
                        textTransform: 'uppercase',
                        transition: 'color .3s ease',
                        color: orange[400],
                        '&:hover': {
                            color: orange[300],
                        },
                    },
                },
            },
        };
    } else {
        theme = {
            name: type,
            palette: {
                mode: 'light',
                primary: {
                    main: '#3399CC',
                },
                secondary: {
                    main: '#164477',
                },
                expert: '#14bb00',
            },
            overrides: {
                MuiLink: {
                    root: {
                        textTransform: 'uppercase',
                        transition: 'color .3s ease',
                        color: orange[400],
                        '&:hover': {
                            color: orange[300],
                        },
                    },
                },
            },
        };
    }

    theme.toolbar = {
        height: 48,
    };

    // add save toolbar
    theme.saveToolbar = {
        background: theme.palette.primary.main,
        button: {
            borderRadius: 3,
            height: 32,
        },
    };

    theme.palette.grey = {
        main: grey[300],
        dark: grey[400],
    };

    theme = createTheme(adaptV4Theme(theme));

    return createTheme(theme, {
        components: {
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'contained', color: 'grey' },
                        style: {
                            color: theme.palette.getContrastText(theme.palette.grey[300]),
                        },
                    },
                    {
                        props: { variant: 'outlined', color: 'grey' },
                        style: {
                            color: theme.palette.text.primary,
                            borderColor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(0, 0, 0, 0.23)'
                                    : 'rgba(255, 255, 255, 0.23)',
                            '&.Mui-disabled': {
                                border: `1px solid ${theme.palette.action.disabledBackground}`,
                            },
                            '&:hover': {
                                borderColor:
                                    theme.palette.mode === 'light'
                                        ? 'rgba(0, 0, 0, 0.23)'
                                        : 'rgba(255, 255, 255, 0.23)',
                                backgroundColor: alpha(
                                    theme.palette.text.primary,
                                    theme.palette.action.hoverOpacity,
                                ),
                            },
                        },
                    },
                    {
                        props: { variant: 'text', color: 'grey' },
                        style: {
                            color: theme.palette.text.primary,
                            '&:hover': {
                                backgroundColor: alpha(
                                    theme.palette.text.primary,
                                    theme.palette.action.hoverOpacity,
                                ),
                            },
                        },
                    },
                ],
            },
        },
    });
};

export default Theme;
