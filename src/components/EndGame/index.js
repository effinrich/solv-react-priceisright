import React from 'react'
import PropTypes from 'prop-types'
import { Box as ReBox } from 'reflexbox'
import { Box, Button } from 'grommet'

import StyledEndGame from './style'

const EndGame = ({ onPlayAgain }) => {
  return (
    <StyledEndGame>
      <Box
        align="center"
        gap="medium"
        justify="center"
        round="small"
        elevation="small"
        pad="medium"
      >
        <ReBox pb={2} textAlign="center">
          <Button type="button" label="Play Again" onClick={onPlayAgain} />
        </ReBox>
      </Box>
    </StyledEndGame>
  )
}

EndGame.propTypes = {
  onPlayAgain: PropTypes.func,
}

export default EndGame
