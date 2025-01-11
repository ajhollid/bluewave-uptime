/* import { light } from "@mui/material/styles/createPalette"; */

const typographyBase = 14;

/* TODO
Check for px in codebase. All font sizes should be in REM and should live here.
Rest should be checked on each case
*/
const typographyLevels = {
	base: typographyBase,
	xs: `${(typographyBase - 4) / 16}rem`,
	s: `${(typographyBase - 2) / 16}rem`,
	m: `${typographyBase / 16}rem`,
	l: `${(typographyBase + 2) / 16}rem`,
	xl: `${(typographyBase + 10) / 16}rem`,
};

/* TODO Review color palette and semantic colors */
const paletteColors = {
	white: "#FFFFFF",
	gray50: "#FEFEFE",
	gray60: "#FEFDFE",
	gray70: "#FDFDFD",
	gray80: "#FDFCFD",
	gray90: "#FCFCFD",
	gray100: "#F4F4F4",
	gray150: "#EFEFEF",
	gray200: "#E3E3E3",
	gray300: "#A2A3A3",
	gray500: "#838C99",
	gray600: "#454546",
	gray750: "#36363E",
	gray800: "#2D2D33",
	gray850: "#131315",
	gray860: "#111113",
	gray870: "#0F0F11",
	gray880: "#0C0C0E",
	gray890: "#09090B",
	blueGray20: "#E8F0FE",
	blueGray150: "#667085",
	blueGray200: "#475467",
	blueGray400: "#344054",
	blueGray900: "#1c2130",
	blueBlueWave: "#1570EF",
	blue700: "#4E5BA6",
	purple300: "#664EFF",
	purple400: "#3A1BFF",
	green50: "#D4F4E1",
	green150: "#45BB7A",
	green400: "#079455",
	green500: "#07B467",
	green800: "#1C4428",
	green900: "#12261E",
	red50: "#F9ECED",
	red100: "#FBD1D1",
	red200: "#F04438",
	red300: "#D32F2F",
	red700: "#542426",
	red800: "#912018",
	orange50: "#FEF8EA",
	orange100: "#FFECBC",
	orange300: "#FDB022",
	orange400: "#FF9F00",
	orange500: "#E88C30",
	orange600: "#DC6803",
	orange800: "#624711",
};

const semanticColors = {
	primary: {
		main: {
			light: paletteColors.blueBlueWave,
			dark: paletteColors.blueBlueWave,
		},
		// TODO we dont have primary light, dark or contrast text
	},
	secondary: {
		main: {
			light: paletteColors.gray100,
			dark: paletteColors.gray800,
		},
		contrastText: {
			light: paletteColors.blueGray200,
			dark: paletteColors.blueGray200,
		},
		light: {
			light: paletteColors.gray200,
			dark: paletteColors.gray200,
		},
		dark: {
			light: paletteColors.gray200,
			dark: paletteColors.gray200,
		},
	},
	success: {
		main: {
			light: paletteColors.green400,
			dark: paletteColors.green400,
		},
		contrastText: {
			light: paletteColors.green50,
			dark: paletteColors.green50,
		},
		light: {
			light: paletteColors.green500,
			dark: paletteColors.green800,
		},
		dark: {
			light: paletteColors.green400,
			dark: paletteColors.green900,
		},
	},
	neutral: {
		contrastText: {
			light: paletteColors.blueGray900,
			dark: paletteColors.gray100,
		},
	},
	error: {
		main: {
			light: paletteColors.red300,
			dark: paletteColors.red300,
		},
		contrastText: {
			light: paletteColors.gray50,
			dark: paletteColors.gray50,
		},
		light: {
			light: paletteColors.red100,
			dark: paletteColors.red700,
		},
		dark: {
			light: paletteColors.red800,
			dark: paletteColors.red800,
		},
	},
	warning: {
		main: {
			light: paletteColors.orange300,
			dark: paletteColors.orange400,
		},
		contrastText: {
			light: paletteColors.orange600,
			dark: paletteColors.orange500,
		},
		light: {
			light: paletteColors.orange100,
			dark: paletteColors.orange800,
		},
		dark: {
			light: paletteColors.orange50,
			dark: paletteColors.gray800,
		},
	},
	/* From this part on, try to create semantic structure, not feature based structure */
	gradient: {
		color1: {
			light: paletteColors.gray90,
			dark: paletteColors.gray890,
		},
		color2: {
			light: paletteColors.gray80,
			dark: paletteColors.gray880,
		},
		color3: {
			light: paletteColors.gray70,
			dark: paletteColors.gray870,
		},
		color4: {
			light: paletteColors.gray60,
			dark: paletteColors.gray860,
		},
		color5: {
			light: paletteColors.gray50,
			dark: paletteColors.gray850,
		},
	},
	background: {
		main: {
			light: paletteColors.white,
			dark: paletteColors.gray890,
		},
		alt: {
			light: paletteColors.gray90,
			dark: paletteColors.gray890,
		},
		fill: {
			light: paletteColors.gray100,
			dark: paletteColors.gray800,
		},
		accent: {
			light: paletteColors.gray100,
			dark: paletteColors.gray850,
		},
	},
	text: {
		primary: {
			light: paletteColors.blueGray900,
			dark: paletteColors.gray100,
		},
		secondary: {
			light: paletteColors.blueGray400,
			dark: paletteColors.gray200,
		},
		tertiary: {
			light: paletteColors.blueGray200,
			dark: paletteColors.gray300,
		},
		accent: {
			light: paletteColors.gray500,
			dark: paletteColors.gray500,
		},
	},
	border: {
		light: {
			light: paletteColors.gray200,
			dark: paletteColors.gray800,
			/* TODO this should live in a different key (border.disabled.light and .dark) */
			disabled: paletteColors.gray150,
		},
		dark: {
			light: paletteColors.gray200,
			dark: paletteColors.gray750,
			/* TODO this should live in a different key (border.disabled.light and .dark) */
			disabled: paletteColors.gray150,
		},
	},
	unresolved: {
		main: {
			light: paletteColors.blue700,
			dark: paletteColors.purple300,
		},
		light: {
			light: paletteColors.blueGray20,
			dark: paletteColors.purple400,
		},
		bg: {
			light: paletteColors.gray100,
			dark: paletteColors.gray100,
		},
	},
	other: {
		icon: {
			light: paletteColors.blueGray150,
		},
		line: {
			light: paletteColors.gray200,
		},
		grid: {
			light: paletteColors.gray300,
			dark: paletteColors.gray600,
		},
		autofill: {
			light: paletteColors.blueGray20,
		},
	},
};

const newColors = {
	offWhite: "#FEFEFE",
	offBlack: "#131315",
	gray100: "#EFEFEF",
	gray200: "#E3E3E3",
	gray500: "#A2A3A3",
	blueGray50: "#E8F0FE",
	blueGray500: "#475467",
	blueGray600: "#344054",
	blueGray800: "#1C2130",
	blueBlueWave: "#1570EF",
	green100: "#8CFFCB",
	green200: "#4B9B77",
	green400: "#079455",
	green700: "#026513",
	orange100: "#FFE5CC",
	orange400: "#FD8F22",
	orange600: "#9B734B",
	orange700: "#694016",
	red100: "#F9C2C2",
	red400: "#D92020",
	red600: "#9B4B4B",
	red700: "#791515",
};

const newSemanticColors = {
	accent: {
		main: {
			light: newColors.blueBlueWave,
			dark: newColors.blueBlueWave,
		},
		contrastText: {
			light: newColors.offWhite,
			dark: newColors.offWhite,
		},
	},
	primary: {
		main: {
			light: newColors.offWhite,
			dark: newColors.offBlack,
		},
		contrastText: {
			main: {
				light: newColors.blueGray800,
				dark: newColors.blueGray50,
			},
			secondary: {
				light: newColors.blueGray600,
				dark: newColors.gray200,
			},
			tertiary: {
				light: newColors.blueGray500,
				dark: newColors.gray500,
			},
		},
		lowContrast: {
			light: newColors.gray200,
			dark: newColors.blueGray600,
		},
	},
	secondary: {
		main: {
			light: newColors.gray200,
			dark: newColors.blueGray600,
		},
		contrastText: {
			light: newColors.blueGray600,
			dark: newColors.gray200,
		},
	},
	tertiary: {
		main: {
			light: newColors.gray100,
			dark: newColors.blueGray800,
		},
		contrastText: {
			light: newColors.blueGray800,
			dark: newColors.gray100,
		},
	},
	/* For success, warning and error, contrastText works wll with main, and with the theme primary main color. Accent is to be used in graphs */
	success: {
		main: {
			light: newColors.green700,
			dark: newColors.green100,
		},
		contrastText: {
			light: newColors.green100,
			dark: newColors.green700,
		},
		accent: {
			light: newColors.green400,
			dark: newColors.green200,
		},
	},
	error: {
		main: {
			light: newColors.red700,
			dark: newColors.red100,
		},
		contrastText: {
			light: newColors.red100,
			dark: newColors.red700,
		},
		accent: {
			light: newColors.red400,
			dark: newColors.red600,
		},
	},
	warning: {
		main: {
			light: newColors.orange700,
			dark: newColors.orange100,
		},
		contrastText: {
			light: newColors.orange100,
			dark: newColors.orange700,
		},
		accent: {
			light: newColors.orange400,
			dark: newColors.orange600,
		},
	},
	/* These are temporary, just for everything not to break */
	gradient: {
		color1: {
			light: paletteColors.gray90,
			dark: paletteColors.gray890,
		},
		color2: {
			light: paletteColors.gray80,
			dark: paletteColors.gray880,
		},
		color3: {
			light: paletteColors.gray70,
			dark: paletteColors.gray870,
		},
		color4: {
			light: paletteColors.gray60,
			dark: paletteColors.gray860,
		},
		color5: {
			light: paletteColors.gray50,
			dark: paletteColors.gray850,
		},
	},
	other: {
		grid: {
			light: paletteColors.gray300,
			dark: paletteColors.gray600,
		},
	},
	unresolved: {
		main: {
			light: paletteColors.blue700,
			dark: paletteColors.purple300,
		},
	},
};

export { typographyLevels, semanticColors as colors, newSemanticColors };
