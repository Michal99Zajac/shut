import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import A from '@mui/material/Link'
import Link from 'next/link'
import { BiEdit } from 'react-icons/bi'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { GQL_BookmarksQuery } from '@/graphql/generated'
import DeleteBookmarkIconButton from '@/bookmarks/components/DeleteBookmarkIconButton'

import { BookmarksTableEmpty } from './components/BookmarksTableEmpty'

interface BookmarksTableProps {
  bookmarks: GQL_BookmarksQuery['bookmarks']
}

export function BookmarksTable({ bookmarks }: BookmarksTableProps) {
  if (bookmarks.edges.length === 0) return <BookmarksTableEmpty />

  return (
    <TableContainer
      component={Paper}
      sx={{
        background: '#f8fafc',
        thead: {
          th: {
            borderBottom: '2px solid #f8fafc',
          },
        },
        tbody: {
          td: {
            borderBottom: 'none',
          },
        },
      }}
      className="!border-2 !border-gray-50 !shadow-none"
    >
      <Table aria-label="bookmarks-table">
        <TableHead>
          <TableRow>
            <TableCell component="th">
              <span className="font-semibold text-gray-400">Name</span>
            </TableCell>
            <TableCell component="th">
              <span className="font-semibold text-gray-400">URL</span>
            </TableCell>
            <TableCell component="th">
              <span className="font-semibold text-gray-400">Group</span>
            </TableCell>
            <TableCell component="th" />
          </TableRow>
        </TableHead>
        <TableBody>
          {bookmarks.edges.map(({ node }) => (
            <TableRow key={node.id}>
              <TableCell>{node.friendlyName}</TableCell>
              <TableCell>
                <A href={node.url} target="_blank">
                  {node.url}
                </A>
              </TableCell>
              <TableCell>
                <span className="rounded-full px-2 bg-primary-200 leading-6 text-primary inline-block">
                  {node.bookmarkGroup.path}
                </span>
              </TableCell>
              <TableCell align="right">
                <div className="inline-flex gap-2">
                  <Tooltip title="Update bookmark">
                    <Link href={`/bookmarks/bookmark/${node.id}`}>
                      <IconButton size="small" className="!rounded">
                        <BiEdit />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <DeleteBookmarkIconButton bookmarkId={node.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BookmarksTable
