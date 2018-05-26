import React, { Component } from 'react'
import ProviderTable from './ProviderTable'
import ProviderForm from './ProviderForm'
import NavigationBar from './NavigationBar'
import Stats from './Stats'
import { throttle } from 'lodash'
import { Container } from 'semantic-ui-react'
import { buildDirectoryQuery, buildCreateProviderQuery, buildGetProviderQuery, buildDeleteProviderQuery } from './../../queries/Queries'
import axios from 'axios'
import faker from 'faker'

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
      activeItem: 'home',
      openModal: false,
      provider: {
        title: '', first_name: '', last_name: '', gender: '',
        email: '', phone: '',
        street_line_1: '',  street_line_2: '',
        sublocality: '', locality: '',  country_code: '', postal_code: ''
      }
    }

    this.performSearch = throttle(this.performSearch, 1000);
    this.blankProvider = this.state.provider;
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

  getProvider = async (id) => {
    const query = buildGetProviderQuery(id)
    const { data: { data: { getProvider } } }= await axios.post('/graphql', { query })
    this.setState({ provider: getProvider })
  }

  createProvider = async () => {
    // const query = buildCreateProviderQuery(this.state.provider)

    const fakeProvider = {
      title: faker.name.suffix(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      gender: ['Male', 'Female'][Math.floor(Math.random() * 2)],
      phone: faker.phone.phoneNumber(),
      street_line_1: faker.address.streetAddress(),
      street_line_2: faker.address.secondaryAddress(),
      sublocality: faker.address.city(),
      locality: faker.address.state(),
      country_code: faker.address.countryCode(),
      postal_code: faker.address.zipCode()
    }
    const query = buildCreateProviderQuery(fakeProvider)

    const { data: { data: { createProvider: { full_name, full_address, id } } }} = await axios.post('/graphql', { query })
    this.setState({ openModal: false })
    alert(`The user ${full_name} was created with address ${full_address} with id ${id}`)
    this.refreshDirectory()
  }

  deleteProvider = async (id) => {
    const query = buildDeleteProviderQuery(id)
    await axios.post('/graphql', { query })
    this.refreshDirectory()
  }

  refreshDirectory = () => {
    const queryDirectory = buildDirectoryQuery({
      navigateToNextPage: false,
      navigateToPreviousPage: false,
      pageInfo: this.state.pageInfo
    })
    this.getProviders(queryDirectory)
  }

  goToNextPage = () => {
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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  openModalCreateProvider = () => {
    this.setState({ openModal: true, provider: this.blankProvider })
  }

  openModalUpdateProvider = (id) => {
    this.setState({ openModal: true })
    this.getProvider(id)
  }

  closeModal = () => this.setState({ openModal: false })

  render() {
    return (
      <Container text style={{ marginTop: '7em' }}>
        <NavigationBar searchOnChange={this.handleSearch} createOnClick={this.openModalCreateProvider} />

        <Stats currentPageNumber={this.state.currentPageNumber} totalPages={this.state.totalPages} totalCount={this.state.totalCount}/>

        <ProviderTable
          dimmerDimmed={this.state.dimmerActive}
          dimmerActive={this.state.dimmerActive}
          directory={this.state.directory}
          getProvider={this.openModalUpdateProvider}
          deleteProvider={this.deleteProvider}
          onClickNextPage={this.goToPrevPage}
          onClickPrevPage={this.goToNextPage}
        />

        <ProviderForm
          {...this.state.provider}
          modalOpen={this.state.openModal}
          modalOnClose={this.closeModal}
          createOnclick={this.createProvider}
          cancelOnClick={this.closeModal}
        />
      </Container>
    )
  }
}
