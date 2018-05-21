import React, { Component } from 'react'
import ProviderTable from './ProviderTable'
import { Pagination } from 'semantic-ui-react'
import axios from 'axios'

export default class ProviderContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPageNumber: 1,
      directory: [],
      totalPages: 0,
      pageInfo: {}
    }
  }

  componentDidMount = () => {
    const query = this.buildQuery({ navigateToNextPage: false, navigateToPreviousPage: false })
    this.getProviders(query)
  }

  buildQuery = ({ navigateToNextPage, navigateToPreviousPage }) => {
    const { endCursor, startCursor } = this.state.pageInfo
    const nextPage = (navigateToNextPage && !navigateToPreviousPage) ? `after: "${endCursor}"` : ''
    const previousPage = (!navigateToNextPage && navigateToPreviousPage) ? `before: "${startCursor}"` : ''
    const args= `first:10 ${nextPage} ${previousPage}`

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

  handlePageChange = (e, { activePage: selectedPageNumber }) => {
    const { currentPageNumber } = this.state
    const navigateToNextPage = currentPageNumber < selectedPageNumber
    const navigateToPreviousPage = currentPageNumber > selectedPageNumber
    this.setState({ currentPageNumber: selectedPageNumber })

    const query = this.buildQuery({ navigateToNextPage, navigateToPreviousPage })
    this.getProviders(query)
  }

  getProviders = async (query) => {
    const { data: { data: { directory: { edges, totalPages, pageInfo } } } } = await axios.post('/graphql', { query })
    this.setState({ directory: edges, totalPages, pageInfo })
  }

  render() {
    return (
      <div>
        <ProviderTable directory={this.state.directory}/>
        <Pagination
          defaultActivePage={this.state.currentPageNumber}
          totalPages={this.state.totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    )
  }
}
