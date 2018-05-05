import React from 'react'
import { Table, Container, Input, Segment, Header, Button } from 'semantic-ui-react'

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
              <Table.HeaderCell>Provider Name</Table.HeaderCell>
              <Table.HeaderCell>Practice Name</Table.HeaderCell>
              <Table.HeaderCell>Practice Address</Table.HeaderCell>
              <Table.HeaderCell>Practice Email</Table.HeaderCell>
              <Table.HeaderCell>Practice Phone</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Smith</Table.Cell>
              <Table.Cell>Some Clinic</Table.Cell>
              <Table.Cell>1 Infinity Loop, Melbourne</Table.Cell>
              <Table.Cell>the@email.com</Table.Cell>
              <Table.Cell>0312341234</Table.Cell>
              <Table.Cell>
                <Button.Group>
                    <Button icon='play' />
                    <Button icon='pause' />
                    <Button icon='shuffle' />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

      </Segment>

    </Container>
  </div>
)

export default FixedMenuLayout
