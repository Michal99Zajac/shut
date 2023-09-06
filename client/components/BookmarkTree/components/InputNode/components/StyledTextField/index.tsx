import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    background: 'rgba(79, 157, 105, 0.05) !important',

    '&:hover': {
      background: 'rgba(79, 157, 105, 0.12) !important',
    },

    '&::before': {
      borderBottom: '1px solid transparent !important',
    },
  },
  '& .MuiInputBase-input': {
    background: 'transparent',
    height: '2rem',
    maxHeight: '2rem',
    boxSizing: 'border-box',
    padding: '2px 14px',
    fontSize: '0.875rem',

    '&:focus': {
      background: 'transparent',
    },
  },
}))

export default StyledTextField
