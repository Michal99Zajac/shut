/**
 * Special type for extracting the input shape from a PothosSchemaTypes.InputObjectRef
 *
 * @example
 * ```ts
 * import InputShape from '#/common/types/InputShape'
 *
 * import { SignUpInput } from '../../inputs/SignUpInput'
 *
 * interface Args {
 *  input: InputShape<typeof SignUpInput>
 * }
 * ```
 */
export type InputShape<T> = T extends PothosSchemaTypes.InputObjectRef<infer I> ? I : never

export default InputShape
