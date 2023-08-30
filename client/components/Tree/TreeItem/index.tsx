import Box from '@mui/material/Box'
import CoreTreeItem, { TreeItemProps as CoreTreeItemProps } from '@mui/lab/TreeItem'
import Typography from '@mui/material/Typography'
import { SvgIconProps } from '@mui/material/SvgIcon'

export type TreeItemProps = CoreTreeItemProps & {
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: string
  labelText: string
}

export function TreeItem(props: TreeItemProps) {
  const { labelIcon: LabelIcon, labelInfo, labelText, ...other } = props

  return (
    <CoreTreeItem
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      {...other}
    />
  )
}

export default TreeItem
