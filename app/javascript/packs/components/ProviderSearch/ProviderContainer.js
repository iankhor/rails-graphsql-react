import React, { Component } from 'react'
import ProviderTable from './ProviderTable'
import { throttle } from 'lodash'
import { Pagination, Icon, Button, Container, Segment, Dimmer, Loader, Statistic, Input } from 'semantic-ui-react'
import { buildDirectoryQuery } from './../../queries/Queries'
import axios from 'axios'

export default class ProviderContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPageNumber: 1,
      directory: [],
      totalCount: 0,
      totalPages: 0,
      pageInfo: {},
      dimmerActive: false,
      searchTerm: '',
    }

    this.performSearch = throttle(this.performSearch, 3000);
  }

  componentDidMount = () => {
    const query = buildDirectoryQuery({
      navigateToNextPage: false,
      navigateToPreviousPage: false,
      pageInfo: this.state.pageInfo
    })
    this.getProviders(query)
  }

  getProviders = async (query) => {
    this.setState({ dimmerActive: true })
    const { data: { data: { directory: { edges, totalPages, pageInfo, totalCount } } } } = await axios.post('/graphql', { query })
    this.setState({ directory: edges, totalPages, pageInfo, dimmerActive: false, totalCount })
  }

  goToNextPage = () => {
    // const query = buildDirectoryQuery({ navigateToNextPage: true, navigateToPreviousPage: false, pageInfo: this.state.pageInfo })
    const { pageInfo, searchTerm } = this.state
    const query = buildDirectoryQuery({
      navigateToNextPage: true,
      navigateToPreviousPage: false,
      pageInfo,
      searchTerm
    })
    this.getProviders(query)
    this.setState({ currentPageNumber: this.state.currentPageNumber + 1 })
  }

  goToPrevPage = () => {
    // const query = buildDirectoryQuery({ navigateToNextPage: false, navigateToPreviousPage: true, pageInfo: this.state.pageInfo })
    const { pageInfo, searchTerm } = this.state
    const query = buildDirectoryQuery({
      navigateToNextPage: false,
      navigateToPreviousPage: true,
      pageInfo,
      searchTerm
    })
    this.setState({ currentPageNumber: this.state.currentPageNumber - 1 })
  }

  performSearch = () => {
    const { pageInfo, searchTerm } = this.state
    const query = buildDirectoryQuery({
      navigateToNextPage: false,
      navigateToPreviousPage: false,
      pageInfo,
      searchTerm
    })
    this.getProviders(query)
  }

  handleSearch = ({ target: { value }}) => {
    this.setState({ searchTerm: value })
    this.performSearch();
  }

  render() {
    return (
      <Container text style={{ marginTop: '7em' }}>
        <Segment>
          <Statistic.Group color='red' widths='three'>
            <Statistic>
              <Statistic.Value>{this.state.currentPageNumber}</Statistic.Value>
              <Statistic.Label>Current Page</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{this.state.totalPages}</Statistic.Value>
              <Statistic.Label>Total Pages</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{this.state.totalCount}</Statistic.Value>
              <Statistic.Label>Total Providers</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>

        <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmerActive}>
            <Dimmer active={this.state.dimmerActive} inverted>
              <Loader>Loading</Loader>
            </Dimmer>

            <Segment inverted>
              <Input fluid inverted icon='search' placeholder='Search...' onChange={this.handleSearch}/>
            </Segment>

            <ProviderTable directory={this.state.directory}/>

            <Segment textAlign='center'>
            <Button icon labelPosition='left' onClick={this.goToPrevPage}><Icon name='left arrow' />Prev</Button>
            <Button icon labelPosition='right' onClick={this.goToNextPage}>Next<Icon name='right arrow' /></Button>
            </Segment>
        </Dimmer.Dimmable>
      </Container>
    )
  }
}
