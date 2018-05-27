import React from 'react'
import { Menu, Input, Button } from 'semantic-ui-react'
import Provider from './Provider'

const NavigationBar = ({ searchOnChange, createOnClick, deleteProvidersOnClick, showDelete = false } ) => (
  <Menu fixed="top">
    <Menu.Item position='left'>
      <Input
        size='large'
        icon='search'
        placeholder='Search provider name'
        onChange={searchOnChange}
        style={{ width: '700px' }}
      />
    </Menu.Item>
    <Menu.Item position='right'>
      <Button color='blue' animated='fade' onClick={createOnClick}>
        <Button.Content visible>Create</Button.Content>
        <Button.Content hidden>Provider</Button.Content>
      </Button>
      { showDelete &&
        (
          <Button color='red' animated='fade' onClick={deleteProvidersOnClick}>
          <Button.Content visible>Delete</Button.Content>
          <Button.Content hidden>Providers</Button.Content>
        </Button>
        )
      }
    </Menu.Item>
  </Menu>
)

export default NavigationBar
