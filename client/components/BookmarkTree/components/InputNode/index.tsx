'use client'

import { FcCheckmark, FcCancel } from 'react-icons/fc'
import { AiOutlineFolder } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

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
  defaultValue?: string
  placeholder?: string
  onSubmit?: (position: InputNodePosition, value: string) => void
  onCancel?: (id: string | number) => void
}

export function InputNode({
  onCancel,
  onSubmit,
  id,
  parent,
  depth,
  placeholder,
  defaultValue,
}: InputNodeProps) {
  const { register, handleSubmit, setFocus } = useForm<InputSchema>({
    defaultValues: {
      input: defaultValue,
    },
    resolver: zodResolver(inputSchema),
  })

  const onInnerSubmit = handleSubmit((data) => {
    onSubmit?.({ id, parent }, data.input)
  })

  useEffect(() => {
    setFocus('input')
  }, [setFocus])

  return (
    <form
      className="h-8 flex gap-2 items-center"
      onSubmit={onInnerSubmit}
      style={{ paddingInlineStart: 12 * depth }}
    >
      <span className="ml-[34px]">
        <AiOutlineFolder />
      </span>
      <StyledTextField
        {...register('input', { required: true })}
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
