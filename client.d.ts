declare namespace Client {
  type SearchParams = { [key: string]: string | undefined }
  type Params<P> = P

  type Route<P = {}> = (props: { searchParams: SearchParams; params: Params<P> }) => React.ReactNode
}
