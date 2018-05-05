import React, { Component } from 'react'
import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'
import PropTypes from 'prop-types'

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer
