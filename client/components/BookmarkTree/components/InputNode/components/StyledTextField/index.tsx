import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    background: '#f1f5f9',
    height: '2rem',
    maxHeight: '2rem',
    boxSizing: 'border-box',
    padding: '2px 14px',
    fontSize: '0.875rem',
  },
}))

export default StyledTextField
