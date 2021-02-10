import React from 'react'
import PropTypes from 'prop-types'
import { Paragraph } from 'grommet'
import { Box as ReBox, Flex } from 'reflexbox'

const TextColumns = ({ player, bid }) => {
  return (
    <Flex justifyContent="space-between">
      <ReBox>
        <Paragraph>
          <strong>Player {player} bid:</strong>
        </Paragraph>
      </ReBox>
      <ReBox>
        <Paragraph>
          <strong>${bid}</strong>
        </Paragraph>
      </ReBox>
    </Flex>
  )
}

TextColumns.propTypes = {
  player: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default TextColumns
