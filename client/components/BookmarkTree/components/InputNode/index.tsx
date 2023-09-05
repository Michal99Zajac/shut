import { FcCheckmark, FcCancel } from 'react-icons/fc'
import { AiOutlineFolder } from 'react-icons/ai'
import InputAdornment from '@mui/material/InputAdornment'

import { StyledTextField } from './components/StyledTextField'
import { StyledIconButton } from './components/StyledIconButton'

export interface InputNodePosition {
  id: string | number
  parent: string | number
}

export interface InputNodeProps {
  id: string | number
  parent: string | number
  value: string
  depth: number
  onChange?: (position: InputNodePosition, value: string) => void
  onSubmit?: (position: InputNodePosition, value: string) => void
  onCancel?: (id: string | number) => void
}

export function InputNode({
  onCancel,
  onChange,
  onSubmit,
  value,
  id,
  parent,
  depth,
}: InputNodeProps) {
  return (
    <form className="h-8 flex gap-2" style={{ paddingInlineStart: 24 * depth + 8 + 16 }}>
      <StyledTextField
        value={value}
        onChange={(event) => onChange?.({ id, parent }, event.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AiOutlineFolder />
            </InputAdornment>
          ),
        }}
      />
      <StyledIconButton
        className="hover:!bg-green-800 hover:!bg-opacity-10"
        size="small"
        aria-label="input-node-submit"
        onClick={() => onSubmit?.({ id, parent }, value)}
      >
        <FcCheckmark />
      </StyledIconButton>
      <StyledIconButton
        className="hover:!bg-red-800 hover:!bg-opacity-10"
        size="small"
        aria-label="input-node-submit"
        onClick={() => onCancel?.(id)}
      >
        <FcCancel />
      </StyledIconButton>
    </form>
  )
}

export default InputNode
