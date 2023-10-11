'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { BiSearchAlt2 } from 'react-icons/bi'

import { useQuery } from '@/hooks/useQuery'
import { useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'

interface Query {
  bookmarkQuery: string
}

interface BookmarkSearchProps {
  className?: string
}

export function BookmarkSearch({ className }: BookmarkSearchProps) {
  const query = useQuery<Query>()
  const [search, setSearch] = useState(query.query.bookmarkQuery || '')

  useDebounce(
    () => {
      // do nothing if search is empty and query is empty
      // It avoids unnecessary re-rendering
      if (search === '' && !query.query.bookmarkQuery) return
      query.set('bookmarkQuery', search)
    },
    300,
    [search],
  )

  return (
    <TextField
      className={className}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BiSearchAlt2 />
          </InputAdornment>
        ),
      }}
      fullWidth
      placeholder="Search "
    />
  )
}

export default BookmarkSearch
