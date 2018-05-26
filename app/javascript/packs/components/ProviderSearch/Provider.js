import React from 'react'
import { Table, Button, Checkbox } from 'semantic-ui-react'

const Provider = ({ id, full_name: providerName, full_address: address, phone, getProvider, deleteProvider }) => (
  <Table.Row>
    <Table.Cell collapsing><Checkbox /></Table.Cell>
    <Table.Cell>{providerName}</Table.Cell>
    <Table.Cell>{address}</Table.Cell>
    <Table.Cell>{phone}</Table.Cell>
    <Table.Cell>
      <Button.Group>
          <Button icon='pencil' onClick={() => getProvider(id)}/>
          <Button icon='trash' onClick={() => deleteProvider(id)}/>
      </Button.Group>
    </Table.Cell>
  </Table.Row>
)

export default Provider
