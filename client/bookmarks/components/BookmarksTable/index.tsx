import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { GQL_BookmarksQuery } from '@/graphql/generated'

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
            <TableCell>Name</TableCell>
            <TableCell align="right">URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookmarks.edges.map(({ node }) => (
            <TableRow key={node.id}>
              <TableCell component="th" scope="row">
                {node.friendlyName}
              </TableCell>
              <TableCell align="right">{node.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BookmarksTable
