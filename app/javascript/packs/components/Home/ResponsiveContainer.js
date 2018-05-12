import React, { Component } from 'react'
import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'
import PropTypes from 'prop-types'

const ResponsiveContainer = ({ children, history }) => (
  <div>
    <DesktopContainer history={history}>{children}</DesktopContainer>
    <MobileContainer history={history}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer
