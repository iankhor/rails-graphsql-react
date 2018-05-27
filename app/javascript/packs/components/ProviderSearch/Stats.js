import React from 'react'
import { Segment, Statistic } from 'semantic-ui-react'

const Stats = ({ currentPageNumber, totalPages, totalCount }) => (
  <Segment>
    Current search details
    <Statistic.Group color='red' widths='three'>
      <Statistic>
        <Statistic.Value>{currentPageNumber}</Statistic.Value>
        <Statistic.Label>Current Page</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{totalPages}</Statistic.Value>
        <Statistic.Label>Total Pages</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{totalCount}</Statistic.Value>
        <Statistic.Label>Total Providers</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </Segment>
)

export default Stats
