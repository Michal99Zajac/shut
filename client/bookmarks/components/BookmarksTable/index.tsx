import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import A from '@mui/material/Link'
import Link from 'next/link'

import { GQL_BookmarksQuery } from '@/graphql/generated'
import DeleteBookmarkIconButton from '@/bookmarks/components/DeleteBookmarkIconButton'

import { BookmarksTableEmpty } from './components/BookmarksTableEmpty'

interface BookmarksTableProps {
  bookmarks: GQL_BookmarksQuery['bookmarks']
}

export function BookmarksTable({ bookmarks }: BookmarksTableProps) {
  if (bookmarks.edges.length === 0) return <BookmarksTableEmpty />

  return (
    <TableContainer component={Paper} className="!bg-gray-50 !shadow-none">
      <Table aria-label="bookmarks-table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Name</TableCell>
            <TableCell component="th">URL</TableCell>
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
              <TableCell align="right">
                <DeleteBookmarkIconButton bookmarkId={node.id} />
                <Link href={`/bookmarks/bookmark/${node.id}?isModal=true`}>update</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BookmarksTable
