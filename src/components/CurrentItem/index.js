import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box as ReBox } from 'reflexbox'
import { Box, Button, TextInput } from 'grommet'
import { BiDollar } from 'react-icons/bi'

import ErrorBox from 'components/ErrorBox'

import StyledItem, { StyledImage, StyledText } from './style'

const CurrentItem = ({ item, onBid, previousBids, isProcessing }) => {
  const [bidAmount, setBidAmount] = useState('')
  const [error, setError] = useState(null)

  const handlePrevBidsCheck = () => {
    return previousBids.some((previousBid) => bidAmount === previousBid)
  }

  const handleBidSubmit = () => {
    if (!handlePrevBidsCheck()) {
      setError(null)
      onBid(bidAmount)
      setBidAmount('')
    } else {
      setError('Whoops! This bid was already placed. Please try another.')
    }
  }

  if (!item) return null

  return (
    <StyledItem>
      <Box
        align="center"
        gap="medium"
        justify="center"
        round="small"
        elevation="small"
        pad="medium"
      >
        <ReBox pb={2} textAlign="center">
          <StyledImage src={item.image} />
          <StyledText>{item.itemName}</StyledText>
        </ReBox>
        <ReBox width={1}>
          <ReBox pb={3}>
            <TextInput
              type="number"
              name="bid"
              placeholder="Your bid"
              value={bidAmount}
              style={{ paddingLeft: '30px' }}
              icon={<BiDollar />}
              onChange={(event) => setBidAmount(event.target.value)}
              disabled={isProcessing}
            />
          </ReBox>
          <ReBox>
            <Button
              type="button"
              label="Submit"
              fill="horizontal"
              onClick={handleBidSubmit}
              disabled={bidAmount <= 0 || isProcessing}
            />
          </ReBox>
          {error && (
            <ErrorBox width="medium" textAlign="center">
              {error}
            </ErrorBox>
          )}
        </ReBox>
      </Box>
    </StyledItem>
  )
}

CurrentItem.propTypes = {
  item: PropTypes.object,
  onBid: PropTypes.func,
  previousBids: PropTypes.array,
  isProcessing: PropTypes.bool,
}

export default CurrentItem
