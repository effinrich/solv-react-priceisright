import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'

const ErrorBox = ({ children, width, textAlign }) => {
  return (
    <Box
      width={width}
      align="center"
      animation="fadeIn"
      background="status-error"
      round="small"
      pad="small"
      margin={{ top: '15px' }}
    >
      <Text weight={600} textAlign={textAlign}>
        {children}
      </Text>
    </Box>
  )
}

ErrorBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  width: PropTypes.string,
  textAlign: PropTypes.string,
}

ErrorBox.defaultProps = {
  width: 'small',
  textAlign: 'left',
}

export default ErrorBox
