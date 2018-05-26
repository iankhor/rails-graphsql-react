import React, { Component } from 'react'
import ProviderTable from './ProviderTable'
import { throttle } from 'lodash'
import { Pagination, Icon, Button, Container, Segment, Dimmer, Loader, Statistic, Input, Menu, Modal, Form, Divider } from 'semantic-ui-react'
import { buildDirectoryQuery, buildCreateProviderQuery, buildGetProviderQuery } from './../../queries/Queries'
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
      createProvider: {
        title: '',
        first_name: '',
        email: '',
        last_name: '',
        gender: '',
        phone: '',
        street_line_1: '',
        street_line_2: '',
        sublocality: '',
        locality: '',
        country_code: '',
        postal_code: ''
      }
    }

    this.performSearch = throttle(this.performSearch, 1000);
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
    console.log(getProvider)
  }

  createProvider = async () => {
    console.log('createProvider')
    // const query = buildCreateProviderQuery(this.state.createProvider)

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

  openModal = () => this.setState({ openModal: true })

  closeModal = () => this.setState({ openModal: false })

  render() {
    return (
      <Container text style={{ marginTop: '7em' }}>
          <Menu fixed="top">
            <Menu.Item position='left'>
              <Input
                size='large'
                icon='search'
                placeholder='Search provider name'
                onChange={this.handleSearch}
                style={{ width: '700px' }}
              />
            </Menu.Item>
            <Menu.Item position='right'>
              <Button color='blue' animated='fade' onClick={this.openModal}>
                <Button.Content visible>Create</Button.Content>
                <Button.Content hidden>Provider</Button.Content>
              </Button>
            </Menu.Item>
          </Menu>

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

          <ProviderTable directory={this.state.directory} getProvider={this.getProvider}/>

          <Segment textAlign='center'>
          <Button icon labelPosition='left' onClick={this.goToPrevPage}><Icon name='left arrow' />Prev</Button>
          <Button icon labelPosition='right' onClick={this.goToNextPage}>Next<Icon name='right arrow' /></Button>
          </Segment>
        </Dimmer.Dimmable>

        <Modal dimmer={'blurring'} open={this.state.openModal} onClose={this.closeModal}>
          <Modal.Header>Create a Provider</Modal.Header>
            <Modal.Content>
              <Modal.Description>
              <Form>
                <Segment>
                  <Divider horizontal>Provider Name</Divider>
                  <Form.Group widths='equal'>
                    <Form.Field id='first-name' control={Input} label='Title' placeholder='Title' />
                    <Form.Field id='first-name' control={Input} label='First name' placeholder='First name' />
                    <Form.Field id='last-name' control={Input} label='Last name' placeholder='Last name' />
                  </Form.Group>
                </Segment>

                <Segment>
                  <Divider horizontal>Address</Divider>
                  <Form.Group widths='equal'>
                    <Form.Field id='steet_1' control={Input} label='Street 1' placeholder='Street 1' />
                  </Form.Group>

                  <Form.Group widths='equal'>
                    <Form.Field id='street_2' control={Input} label='Street 2' placeholder='Street 2' />
                  </Form.Group>

                  <Form.Group widths='equal'>
                    <Form.Field id='sublocality' control={Input} label='Suburb' placeholder='Suburb' />
                  </Form.Group>

                  <Form.Group widths='equal'>
                    <Form.Field id='locality' control={Input} label='City' placeholder='City' />
                  </Form.Group>

                  <Form.Group widths='equal'>
                    <Form.Field id='country' control={Input} label='Country' placeholder='Country' />
                  </Form.Group>
                </Segment>

                <Segment>
                  <Divider horizontal>Contact</Divider>
                  <Form.Group widths='equal'>
                    <Form.Field id='phone' control={Input} label='Phone' placeholder='Phone' />
                  </Form.Group>

                  <Form.Group widths='equal'>
                    <Form.Field id='email' control={Input} label='Email' placeholder='Email' />
                  </Form.Group>
                </Segment>
              </Form>
              </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
              <Button positive icon='checkmark' labelPosition='right' content="Create Provider" onClick={this.createProvider} />
              <Button secondary color='black' onClick={this.closeModal}>Cancel</Button>
            </Modal.Actions>
        </Modal>
      </Container>
    )
  }
}
