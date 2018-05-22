export function buildDirectoryQuery({ navigateToNextPage, navigateToPreviousPage, pageInfo }) {
  const { endCursor, startCursor } = pageInfo
  const nextPage = (navigateToNextPage && !navigateToPreviousPage) ? `after: "${endCursor}"` : ''
  const previousPage = (!navigateToNextPage && navigateToPreviousPage) ? `before: "${startCursor}"` : ''
  const args= `first:5 ${nextPage} ${previousPage}`

  return(
    `{
      directory(${args}) {
        totalCount
        totalPages
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            full_name
            full_address
            phone
          }
        }
      }
    }`
  )
}
