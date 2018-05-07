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
    const query = 'query {\n  directory(\n    first: 20,\n    skip: 0\n  ) {\n    country_code\n    email\n    first_name\n    last_name\n    phone\n    title\n  } }'

    const { data } = await axios.post('/graphql', { query })
    console.log(data)
  }

  render() {
    return(
      <div>
        <ProviderTable data={data}/>
      </div>
    )
  }
}
