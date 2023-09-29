declare namespace Client {
  type SearchParams = { [key: string]: string | undefined }
  type Params<P> = P

  type PageProps<P = {}> = { searchParams: SearchParams; params: Params<P> }
  type Page<P = {}> = (props: PageProps<P>) => React.ReactNode
}
