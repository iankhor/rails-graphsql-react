import React, { Component } from 'react'
import ProviderTable from './ProviderTable'
import ProviderForm from './ProviderForm'
import NavigationBar from './NavigationBar'
import Stats from './Stats'
import { throttle } from 'lodash'
import { Container, Visibility } from 'semantic-ui-react'
import { buildDirectoryQuery, buildCreateProviderQuery, buildGetProviderQuery, buildDeleteProviderQuery, buildDeleteProvidersQuery } from './../../queries/Queries'
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
      selectedProviders: [],
      provider: {
        title: '', first_name: '', last_name: '', gender: '',
        email: '', phone: '',
        street_line_1: '',  street_line_2: '',
        sublocality: '', locality: '',  country_code: '', postal_code: ''
      },
      calculations: {
        topVisible: false,
        bottomVisible: false,
      }
    }

    this.performSearch = throttle(this.performSearch, 1200);
    this.blankProvider = this.state.provider;
  }

  componentDidMount = async () => {
    const response = await this.getProviders(buildDirectoryQuery({}))
    this.updateComponentProviders(response)
  }

  updateComponentProviders = ({ data: { data: { getProviders: { edges, totalPages, pageInfo, totalCount } } } }) => {
    this.setState({ directory: edges, totalPages, pageInfo, dimmerActive: false, totalCount })
  }

  getProviders = async (query) => {
    this.setState({ dimmerActive: true })
    return await axios.post('/graphql', { query })
  }

  getProvider = async (id) => {
    const query = buildGetProviderQuery(id)
    const { data: { data: { getProvider } } }= await axios.post('/graphql', { query })
    this.setState({ provider: getProvider })
  }

  createProvider = async () => {
    // to implement create provider later
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
    const response = await this.getProviders(buildDirectoryQuery({}))
    this.updateComponentProviders(response)
    alert(`The user ${full_name} was created with address ${full_address} with id ${id}`)
  }

  deleteProviders = async () => {
    const query = buildDeleteProvidersQuery(this.state.selectedProviders)
    const { data: { data: { deleteProviders } } } = await axios.post('/graphql', { query })
    this.setState({ deleteProviders: [] })


    const deletedIds = deleteProviders.map( p => p.id )
    alert(`The users with ids ${deletedIds} were deleted`)

    // this.getProviders(buildDirectoryQuery({}))
    window.location.reload(true) //currently a hack, need to figure a way to reset all checkboxes after deletion
  }

  selectedDeleteProvider = ({ checked }, id) => {
    checked ? this.addToSelectedProviders(id) : this.removeFromSelectedProvders(id)
  }

  addToSelectedProviders = (id) => this.setState({ selectedProviders: [...this.state.selectedProviders, id] })

  removeFromSelectedProvders = (id) => {
    const selectedProviders = this.state.selectedProviders.filter( selectedId => selectedId != id )
    this.setState({ selectedProviders })
  }

  goToNextPage = async () => {
    const { pageInfo, searchTerm } = this.state
    const response = await this.getProviders(buildDirectoryQuery({ navigateToNextPage: true, pageInfo, searchTerm }))
    this.updateComponentProviders(response)
    this.setState({ currentPageNumber: this.state.currentPageNumber + 1 })
  }

  goToPrevPage = async () => {
    const { pageInfo, searchTerm } = this.state
    const response = await this.getProviders(buildDirectoryQuery({ navigateToPreviousPage: true, pageInfo, searchTerm }))
    this.updateComponentProviders(response)
    this.setState({ currentPageNumber: this.state.currentPageNumber - 1 })
  }

  performSearch = async () => {
    const { pageInfo, searchTerm } = this.state
    const response = await this.getProviders(buildDirectoryQuery({ pageInfo, searchTerm }))
    this.updateComponentProviders(response)
  }

  handleSearch = ({ target: { value: searchTerm }}) => {
    this.setState({ searchTerm })
    this.performSearch();
  }

  openModalCreateProvider = () => {
    this.setState({ openModal: true, provider: this.blankProvider })
  }

  openModalUpdateProvider = (id) => {
    this.setState({ openModal: true })
    this.getProvider(id)
  }

  handleEndOfPage = async () => {
    console.log('handleEndOfPage')
    const { pageInfo, searchTerm } = this.state
    const response = await this.getProviders(buildDirectoryQuery(
      { navigateToNextPage: true, pageInfo, searchTerm })
    )

    const { data: { data: { getProviders: { edges, totalPages, pageInfo: newPageInfo, totalCount } } } } = response
    console.log(response)
    this.setState(
      { directory: [...this.state.directory, ...edges],
        totalPages,
        pageInfo: newPageInfo,
        dimmerActive: false,
        totalCount
      }
    )
  }

  handleScroll = (e, { calculations }) => this.setState({ calculations })

  closeModal = () => this.setState({ openModal: false })

  render() {
    return (
      <Container text style={{ marginTop: '7em' }}>
        <NavigationBar
          searchOnChange={this.handleSearch}
          createOnClick={this.openModalCreateProvider}
          deleteProvidersOnClick={this.deleteProviders}
          showDeleteAndMerge={ this.state.selectedProviders.length ? true : false }
        />

        <Stats currentPageNumber={this.state.currentPageNumber} totalPages={this.state.totalPages} totalCount={this.state.totalCount}/>

        <Visibility
          continuous={true}
          offset={[10, 10]}
          onUpdate={this.handleScroll}
          onBottomVisible={this.handleEndOfPage}
        >
          <ProviderTable
            dimmerDimmed={this.state.dimmerActive}
            dimmerActive={this.state.dimmerActive}
            directory={this.state.directory}
            getProvider={this.openModalUpdateProvider}
            deleteProvider={this.deleteProvider}
            onClickNextPage={this.goToPrevPage}
            onClickPrevPage={this.goToNextPage}
            selectedDeleteProvider={this.selectedDeleteProvider}
          />

        </Visibility>
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
