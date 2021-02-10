import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'

const AppBar = ({ children, ...props }) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="center"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1', minHeight: '65px' }}
    elevation="small"
    {...props}
  >
    {children}
  </Box>
)

AppBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default AppBar
