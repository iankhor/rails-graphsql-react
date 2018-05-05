import React from 'react'
import { Container, Input, Segment, Header } from 'semantic-ui-react'

const FixedMenuLayout = () => (
  <div>
    <Container text style={{ marginTop: '7em' }}>
      <Segment inverted>
        <Input fluid inverted icon='search' placeholder='Search...' />
      </Segment>

      <Header as='h1'>Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>A text container is used for the main container, which is useful for single column layouts.</p>

    </Container>
  </div>
)

export default FixedMenuLayout
