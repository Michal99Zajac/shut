/**
 * A utility function to pause the execution of code for a specified time.
 *
 * @param ms - The number of milliseconds to pause the execution.
 * @returns A promise that resolves after the specified milliseconds.
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default sleep
