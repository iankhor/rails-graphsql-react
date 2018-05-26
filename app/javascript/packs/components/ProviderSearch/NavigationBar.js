import React from 'react'
import { Menu, Input, Button } from 'semantic-ui-react'
import Provider from './Provider'

const NavigationBar = ({ searchOnChange, createOnClick } ) => (
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
    </Menu.Item>
  </Menu>
)

export default NavigationBar
