import { PaletteOptions, Theme, ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    craa?: {
      palette: {
        mainGradiant?: string;
        invert?: string;
        mainGrey?: '#323639';
        orange?: string;
        blue?: string;
        red?: string;
        green?: string;
        yellow?: string;
        darkfont?: string;
        mainfont?: string;
        header?: string;
        lightborder?: string;
        main?: string;
        dark?: string;
        medium?: string;
        point?: string;
        light?: string;
      };
    };
  }
  interface ThemeOptions {
    craa?: {
      palette: {
        mainGradiant?: string;
        invert?: string;
        mainGrey?: '#323639';
        orange?: string;
        blue?: string;
        red?: string;
        green?: string;
        yellow?: string;
        darkfont?: string;
        mainfont?: string;
        header?: string;
        lightborder?: string;
        main?: string;
        dark?: string;
        medium?: string;
        point?: string;
        light?: string;
      };
    };
  }
  // interface BreakpointOverrides {
  //   breakpoints: {
  //     values: {
  //       df: true
  //       xs: true
  //       sm: true
  //       md: true
  //       lg: true
  //       xl: true
  //     }
  //   }
  // }

  // interface PaletteOptions {
  //   craa?: {
  //     mainGradiant?: string
  //     invert?: string
  //   }
  // }
}

const customTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#396d82',
    },
    secondary: {
      main: '#396d82',
    },

    // action: {
    //   hover: '#336699',
    //   hoverOpacity: 0.9,
    // }
  },
  craa: {
    palette: {
      mainGradiant:
        'linear-gradient(90deg, #377485 0%, #5B97A8 50.52%, #0A304D 100%)',
      invert: 'wthie',
      mainGrey: '#323639',
      orange: 'rgb(236, 114, 17)',
      blue: 'rgb(0, 115, 187)',
      green: 'rgb(29, 129, 2)',
      red: 'rgb(209, 50, 18)',
      yellow: 'rgb(255, 153, 0)',
      darkfont: 'rgb(22, 25, 31)',
      mainfont: 'rgb(84, 91, 100)',
      header: 'linear-gradient(135deg,#377485,#5b97a8 25%,#0a304d)',
      lightborder: 'rgb(243, 237, 237)',
      main: '#58a7c9',
      dark: '#396d82',
      medium: '#8eb4c4',
      point: '#79b1b3',
      light: '#d3e1e6',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: 'white',
          border: '1px solid white',
        },
      },
    },
  },
  // breakpoints: {
  //   values: {
  //     df: 0,
  //     xs: 375,
  //     sm: 720,
  //     md: 1290,
  //     lg: 1440,
  //     xl: 2048,
  //   },
  // },
});

export default customTheme;
