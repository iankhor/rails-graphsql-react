import React, { Component } from 'react'
import ProviderTable from './ProviderSearch'
import faker from 'faker'
import axios from 'axios'

const data = [
  {
    providerName: faker.name.findName(),
    practiceName: faker.company.companyName(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  },
  {
    providerName: faker.name.findName(),
    practiceName: faker.company.companyName(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  }
]

export default class ProviderContainer extends Component {

  componentDidMount = () => {
    this.getProviders()
  }

  getProviders = async () => {
    const query =
    `query {
        directory(first: 20,skip: 0)
        {
          country_code
          email
          first_name
          last_name
          phone
          title
        }
      }`

    const { data: { data: { directory } } } = await axios.post('/graphql', { query })
    console.log(directory)
  }

  render() {
    return(
      <div>
        <ProviderTable data={data}/>
      </div>
    )
  }
}
