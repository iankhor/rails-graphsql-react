import React from 'react'
import { Table, Segment, Header, Button, Dimmer, Loader, Icon } from 'semantic-ui-react'
import Provider from './Provider'

const ProviderTable = ({ directory, dimmerDimmed, dimmerActive, getProvider, onClickNextPage, onClickPrevPage, deleteProvider, selectedDeleteProvider } ) => (
  <Dimmer.Dimmable as={Segment} dimmed={dimmerDimmed}>
    <Dimmer active={dimmerActive} inverted>
      <Loader>Loading</Loader>
    </Dimmer>

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
            { directory.map( ({ cursor, node: provider }) => <Provider {...provider} key={cursor} getProvider={getProvider} deleteProvider={deleteProvider} selectedDeleteProvider={selectedDeleteProvider} /> )}
          </Table.Body>
        </Table>
    </Segment>

    <Segment textAlign='center'>
      <Button icon labelPosition='left' onClick={onClickNextPage}><Icon name='left arrow' />Prev</Button>
      <Button icon labelPosition='right' onClick={onClickPrevPage}>Next<Icon name='right arrow' /></Button>
    </Segment>
</Dimmer.Dimmable>
)

export default ProviderTable
