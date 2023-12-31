'use client'

import { useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { BiFileFind } from 'react-icons/bi'

import useQuery from '@/hooks/useQuery'

export function BookmarkGroupSearch() {
  const query = useQuery<{ bookmarkGroupQuery: string }>()
  const [search, setSearch] = useState(query.query.bookmarkGroupQuery || '')

  useDebounce(
    () => {
      // do nothing if search is empty and query is empty
      // It avoids unnecessary re-rendering
      if (search === '' && !query.query.bookmarkGroupQuery) return
      query.set('bookmarkGroupQuery', search)
    },
    300,
    [search],
  )

  return (
    <TextField
      fullWidth
      size="medium"
      placeholder="Search Groups"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BiFileFind />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default BookmarkGroupSearch
