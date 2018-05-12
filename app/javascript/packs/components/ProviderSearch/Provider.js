import React from 'react'
import { Table, Button, Checkbox } from 'semantic-ui-react'

const Provider = ({ full_name: providerName, full_address: address, phone }) => (
  <Table.Row>
    <Table.Cell collapsing><Checkbox /></Table.Cell>
    <Table.Cell>{providerName}</Table.Cell>
    <Table.Cell>{address}</Table.Cell>
    <Table.Cell>{phone}</Table.Cell>
    <Table.Cell>
      <Button.Group>
          <Button icon='play' />
          <Button icon='pause' />
          <Button icon='shuffle' />
      </Button.Group>
    </Table.Cell>
  </Table.Row>
)

export default Provider
