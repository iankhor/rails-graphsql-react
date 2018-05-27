import React from 'react'
import { Table, Button, Checkbox } from 'semantic-ui-react'

const Provider = (props) => {
  const {
    id, full_name: providerName, full_address: address, phone,
    getProvider, selectedDeleteProvider,
  } = props

  return(
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox onChange={ (event, data) => selectedDeleteProvider(data, id)} />
      </Table.Cell>
      <Table.Cell>{providerName}</Table.Cell>
      <Table.Cell>{address}</Table.Cell>
      <Table.Cell>{phone}</Table.Cell>
      <Table.Cell>
        <Button.Group>
            <Button icon='pencil' onClick={() => getProvider(id)}/>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  )
}

export default Provider
