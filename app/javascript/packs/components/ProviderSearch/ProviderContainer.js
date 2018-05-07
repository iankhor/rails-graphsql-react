import React, { Component } from 'react'
import ProviderTable from './ProviderSearch'
import faker from 'faker'

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
  render() {
    return(
      <div>
        <ProviderTable data={data}/>
      </div>
    )
  }
}
