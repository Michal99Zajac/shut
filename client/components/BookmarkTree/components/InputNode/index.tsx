import { FcCheckmark, FcCancel } from 'react-icons/fc'
import { AiOutlineFolder } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { StyledTextField } from './components/StyledTextField'
import { StyledIconButton } from './components/StyledIconButton'
import { inputSchema, InputSchema } from './schemas/inputSchema'

export interface InputNodePosition {
  id: string | number
  parent: string | number
}

export interface InputNodeProps {
  id: string | number
  parent: string | number
  depth: number
  placeholder?: string
  onSubmit?: (position: InputNodePosition, value: string) => void
  onCancel?: (id: string | number) => void
}

export function InputNode({ onCancel, onSubmit, id, parent, depth, placeholder }: InputNodeProps) {
  const { register, handleSubmit } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
  })

  const onInnerSubmit = handleSubmit((data) => {
    onSubmit?.({ id, parent }, data.input)
  })

  return (
    <form
      className="h-8 flex gap-2 items-center"
      onSubmit={onInnerSubmit}
      style={{ paddingInlineStart: 24 * depth + 8 }}
    >
      <span className="ml-[18px]">
        <AiOutlineFolder />
      </span>
      <StyledTextField
        {...register('input', { required: true })}
        variant="filled"
        size="small"
        fullWidth
        placeholder={placeholder}
      />
      <StyledIconButton
        className="hover:!bg-green-800 hover:!bg-opacity-10"
        size="small"
        aria-label="input-node-submit"
        type="submit"
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
