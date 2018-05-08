import React, { Component } from 'react'
import ProviderTable from './ProviderTable'
import faker from 'faker'
import axios from 'axios'

export default class ProviderContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      directory: []
    }
  }

  componentDidMount = () => this.getProviders()

  getProviders = async () => {
    const query =
    `query {
      directory(first: 20,skip: 0)
        {
          full_name
          full_address
          email
          phone
        }
      }`

    const { data: { data: { directory } } } = await axios.post('/graphql', { query })
    this.setState({ directory })
  }

  render() {
    return <div><ProviderTable directory={this.state.directory}/></div>
  }
}
