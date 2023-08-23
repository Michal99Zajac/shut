'use client'

import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4F9D69',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#F7F7F7',
          borderRadius: '4px',
          '& fieldset': {
            borderColor: '#F7F7F7',
            borderWidth: '2px',
            transition: 'border-color 0.2s ease-in-out',
            '&:hover': {
              borderColor: '#9F9F9F',
            },
          },
        },
      },
    },
  },
})

export default theme
