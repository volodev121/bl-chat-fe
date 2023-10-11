import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Config } from "./../utils/types.tsx";

const customThemeFactory = function(config: Config) {
  const theme = createTheme((theme) => {
  return {
    typography: {
      fontSize: 16,
      fontFamily: [
        'Poppins'
      ].join(','),
    },
    palette: {
      primary: {
        main: config.colors.body_color,
        contrastText: config.colors.font_color,
      },
      secondary: {
        main: config.colors.cta_color,
        contrastText: config.colors.cta_font_color,
      },
      heading: theme.palette.augmentColor({
        color: {
          main: config.colors.heading_background_color,
          contrastText: config.colors.heading_font_color,
        },
        name: 'heading',
      })
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    // ... other theme customization
  }});
  return theme;
}

export default customThemeFactory;
