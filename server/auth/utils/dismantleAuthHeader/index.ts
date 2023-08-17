/**
 * Spills the bearer token from the authorization header.
 *
 * @param authHeader - The authorization header.
 * @returns The bearer token.
 */
export const dismantleAuthHeader = (authHeader: string | null) => {
  // Check if authorization header is present
  if (!authHeader) {
    return null
  }

  // Remove Bearer from authorization header
  const [bearer, token] = authHeader.split(' ')

  // Check if bearer is present
  if (bearer !== 'Bearer') return null

  // Return token
  return token
}

export default dismantleAuthHeader
