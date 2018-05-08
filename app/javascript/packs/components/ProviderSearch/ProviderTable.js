import React from 'react'
import { Table, Container, Input, Segment, Header, Button, Checkbox } from 'semantic-ui-react'
import Provider from './Provider'

const ProviderTable = ({ directory }) => (
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
            <Table.HeaderCell>Practice Address</Table.HeaderCell>
            <Table.HeaderCell>Practice Email</Table.HeaderCell>
            <Table.HeaderCell>Practice Phone</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { directory.map( (provider, index) => <Provider {...provider} key={index}/> )}
        </Table.Body>
      </Table>

    </Segment>

  </Container>
)

export default ProviderTable