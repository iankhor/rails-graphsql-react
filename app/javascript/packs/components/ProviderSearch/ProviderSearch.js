import React from 'react'
import { Table, Container, Input, Segment, Header, Button, Checkbox } from 'semantic-ui-react'
import Provider from './Provider'
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

const FixedMenuLayout = () => (
  <div>
    <Container text style={{ marginTop: '7em' }}>
      <Segment inverted>
        <Input fluid inverted icon='search' placeholder='Search...' />
      </Segment>

      <Segment>
      <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Provider Name</Table.HeaderCell>
              <Table.HeaderCell>Practice Name</Table.HeaderCell>
              <Table.HeaderCell>Practice Address</Table.HeaderCell>
              <Table.HeaderCell>Practice Email</Table.HeaderCell>
              <Table.HeaderCell>Practice Phone</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { data.map( (provider, index) => <Provider {...provider} key={index}/> )}
          </Table.Body>
        </Table>

      </Segment>

    </Container>
  </div>
)

export default FixedMenuLayout
