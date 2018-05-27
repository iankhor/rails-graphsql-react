export function buildDirectoryQuery({ navigateToNextPage = false, navigateToPreviousPage = false, pageInfo = {}, searchTerm = '', pageSize = 80 }) {
  const { endCursor, startCursor } = pageInfo
  const nextPage = (navigateToNextPage && !navigateToPreviousPage) ? `first:${pageSize} after: "${endCursor}"` : ''
  const previousPage = (!navigateToNextPage && navigateToPreviousPage) ? `last:${pageSize} before: "${startCursor}"` : ''
  const init = (!navigateToNextPage && !navigateToPreviousPage) ? `first:${pageSize}` : ''
  const args= `${init} ${nextPage} ${previousPage} searchTerm: "${searchTerm}"` //need better logic here

  return(
    `{
      getProviders(${args}) {
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
            id
            full_name
            full_address
            phone
          }
        }
      }
    }`
  )
}

export function buildCreateProviderQuery(params) {
  const {
    title, first_name, last_name, gender, phone, email,
    street_line_1, street_line_2, sublocality, locality,
    country_code, postal_code
  } = params

  return (`
    mutation {
      createProvider(
        title: "${title}",
        first_name: "${first_name}",
        last_name: "${last_name}",
        gender: "${gender}",
        email: "${email}",
        phone: "${phone}",
        street_line_1: "${street_line_1}",
        street_line_2: "${street_line_2}",
        sublocality: "${sublocality}",
        locality: "${locality}",
        country_code: "${country_code}"
        postal_code: "${postal_code}"
      ) {
          id
          full_name
          full_address
        }
    }
  `)
}

export function buildGetProviderQuery(id) {

  return (`
    query {
      getProvider(id: ${id}) {
        title
        first_name
        last_name
        gender
        email
        phone
        street_line_1
        street_line_2
        sublocality
        locality
        country_code
        postal_code
      }
    }
  `)
}

export function buildDeleteProviderQuery(id) {

  return (`
    mutation {
      deleteProvider(id: ${id})
      {
        id
        full_name
        full_address
        gender
      }
    }
  `)
}

export function buildDeleteProvidersQuery(ids) {

  return (`
    mutation {
      deleteProviders(ids: [${ids}])
      {
        id
        full_name
        full_address
        gender
      }
    }
  `)
}
