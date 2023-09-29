'use client'

import type {} from '@mui/lab/themeAugmentation'
import { createTheme } from '@mui/material/styles'
import { treeItemClasses } from '@mui/lab/TreeItem'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4F9D69',
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-koulen)',
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        root: {
          '& > .MuiTreeItem-content': {
            height: '32px',
            borderRadius: '4px',
          },
          [`& .${treeItemClasses.group}`]: {
            marginLeft: '0px',
            [`& .${treeItemClasses.content}`]: {
              paddingLeft: '16px',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root': {
            background: '#f8fafc',
            fieldset: {
              borderColor: '#f8fafc',
              borderWidth: '2px',
              transition: 'border-color 0.2s ease-in-out',
            },
            '&:hover fieldset': {
              borderColor: '#9F9F9F',
            },
          },
          '.MuiInputBase-input': {
            borderRadius: '4px',
          },
        },
      },
    },
  },
})

export default theme
