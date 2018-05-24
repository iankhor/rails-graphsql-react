export function buildDirectoryQuery({ navigateToNextPage, navigateToPreviousPage, pageInfo, searchTerm = '', pageSize = 80 }) {
  const { endCursor, startCursor } = pageInfo
  const nextPage = (navigateToNextPage && !navigateToPreviousPage) ? `first:${pageSize} after: "${endCursor}"` : ''
  const previousPage = (!navigateToNextPage && navigateToPreviousPage) ? `last:${pageSize} before: "${startCursor}"` : ''
  const init = (!navigateToNextPage && !navigateToPreviousPage) ? `first:${pageSize}` : ''
  const args= `${init} ${nextPage} ${previousPage} searchTerm: "${searchTerm}"` //need better logic here

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
