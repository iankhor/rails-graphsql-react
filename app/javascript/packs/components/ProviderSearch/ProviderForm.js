import React from 'react'
import { Button, Segment, Form, Divider, Input, Modal } from 'semantic-ui-react'

const ProviderForm = ({ id, title, first_name, last_name, gender, phone, email, street_line_1, street_line_2, sublocality, locality, country_code, modalOpen, modalOnClose, createOnclick, cancelOnClick }) => (
  <Modal dimmer={'blurring'} open={modalOpen} onClose={modalOnClose}>
    <Modal.Header>Create a Provider</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Segment>
              <Divider horizontal>Provider Name</Divider>
              <Form.Group widths='equal'>
                <Form.Field id='title' control={Input} label='Title' placeholder='Title' value={title}/>
                <Form.Field id='first_name' control={Input} label='First name' placeholder='First name' value={first_name} />
                <Form.Field id='last_name' control={Input} label='Last name' placeholder='Last name' value={last_name}/>
              </Form.Group>
            </Segment>

            <Segment>
              <Divider horizontal>Address</Divider>
              <Form.Group widths='equal'>
                <Form.Field id='street_line_1' control={Input} label='Street 1' placeholder='Street 1' value={street_line_1}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field id='street_line_2' control={Input} label='Street 2' placeholder='Street 2' value={street_line_2}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field id='sublocality' control={Input} label='Suburb' placeholder='Suburb' value={sublocality}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field id='locality' control={Input} label='City' placeholder='City' value={locality}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field id='country' control={Input} label='Country' placeholder='Country' value={country_code}/>
              </Form.Group>
            </Segment>

            <Segment>
              <Divider horizontal>Contact</Divider>
              <Form.Group widths='equal'>
                <Form.Field id='phone' control={Input} label='Phone' placeholder='Phone' value={phone}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field id='email' control={Input} label='Email' placeholder='Email' value={email}/>
              </Form.Group>
            </Segment>
          </Form>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button positive icon='checkmark' labelPosition='right' content="Create Provider" onClick={createOnclick} />
        <Button secondary color='black' onClick={cancelOnClick}>Cancel</Button>
      </Modal.Actions>
  </Modal>
)

export default ProviderForm
