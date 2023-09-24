'use client'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { TbWorldSearch } from 'react-icons/tb'

import { useQuery } from '@/hooks/useQuery'
import { useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'

interface Query {
  qBookmark: string
}

interface BookmarkSearchProps {
  className?: string
}

export function BookmarkSearch({ className }: BookmarkSearchProps) {
  const query = useQuery<Query>()
  const [search, setSearch] = useState(query.query.qBookmark || '')

  useDebounce(
    () => {
      query.set('qBookmark', search)
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
            <TbWorldSearch />
          </InputAdornment>
        ),
      }}
      fullWidth
      placeholder="Search "
    />
  )
}

export default BookmarkSearch
