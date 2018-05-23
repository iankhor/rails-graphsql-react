export function buildDirectoryQuery({ navigateToNextPage, navigateToPreviousPage, pageInfo }) {
  const { endCursor, startCursor } = pageInfo
  const nextPage = (navigateToNextPage && !navigateToPreviousPage) ? `first:5 after: "${endCursor}"` : ''
  const previousPage = (!navigateToNextPage && navigateToPreviousPage) ? `last 5 before: "${startCursor}"` : ''
  const args= `${nextPage} ${previousPage}`

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
