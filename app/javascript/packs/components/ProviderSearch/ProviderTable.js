import React from 'react'
import { Table, Container, Input, Segment, Header, Button, Checkbox, Pagination } from 'semantic-ui-react'
import Provider from './Provider'

const ProviderTable = ({ directory }) => (
  <Segment>
    <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Provider Name</Table.HeaderCell>
            <Table.HeaderCell>Practice Address</Table.HeaderCell>
            <Table.HeaderCell>Practice Phone</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { directory.map( ({ cursor, node: provider }) => <Provider {...provider} key={cursor}/> )}
        </Table.Body>
      </Table>
  </Segment>
)

export default ProviderTable
