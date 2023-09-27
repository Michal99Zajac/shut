import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Dialog, { DialogProps } from '@mui/material/Dialog'

const megaDialogStyles = css`
  .MuiPaper-root {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
    border-radius: 0;
  }
`

/**
 * Dialog that takes up the entire screen on mobile.
 */
export const MegaDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'isMega',
})<DialogProps & { isMega?: boolean }>`
  .MuiBackdrop-root {
    background: transparent;
    backdrop-filter: blur(10px);
  }

  ${(props) => props.isMega && megaDialogStyles}

  @media (max-width: 640px) {
    ${megaDialogStyles}
  }
`

export default MegaDialog
