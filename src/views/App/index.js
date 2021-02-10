import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Main, Box, Heading, Text } from 'grommet'
import { Box as ReBox } from 'reflexbox'

import AppBar from 'components/AppBar'
import CurrentItem from 'components/CurrentItem'
import EndGame from 'components/EndGame'
import TextColumns from 'components/TextColumns'
import bidItems from 'store/bid-items.json'

import StyledWrapper from './style'

const App = () => {
  const currentItemIndex = useRef(0)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [player1Bid, setPlayer1Bid] = useState(null)
  const [player2Bid, setPlayer2Bid] = useState(null)
  const [previousBids, setPreviousBids] = useState([])
  const [roundWinner, setRoundWinner] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleResetAndContinue = useCallback(() => {
    currentItemIndex.current += 1
    setCurrentPlayer(1)
    setPlayer1Bid(null)
    setPlayer2Bid(null)
    setRoundWinner(null)
    setCurrentItem(bidItems[currentItemIndex.current])
    setPreviousBids([])
    setIsProcessing(false)
  }, [currentItemIndex, setPlayer1Bid, setPlayer2Bid, setCurrentItem])

  const handleWinningBid = useCallback(
    (bid) => {
      if (currentItem && player1Bid && bid) {
        const playersArray = [
          { player: 1, bid: parseFloat(player1Bid) },
          { player: 2, bid: parseFloat(bid) },
        ]

        const itemPrice = currentItem.price
        const confirmBids = playersArray.filter(
          (player) => player.bid <= itemPrice
        )

        const winner =
          confirmBids.length > 0
            ? confirmBids.reduce((prev, current) =>
                prev.bid > current.bid ? prev : current
              )
            : 'Both players overbid! No winners.'

        setRoundWinner(winner)

        const timeout = setTimeout(() => {
          handleResetAndContinue()
        }, 4000)

        return () => clearTimeout(timeout)
      }
    },
    [currentItem, handleResetAndContinue, player1Bid]
  )

  useEffect(() => {
    const [item] = bidItems
    setCurrentItem(item)
  }, [setCurrentItem])

  const handleOnBid = (bid) => {
    setPreviousBids([...previousBids, bid])
    if (currentPlayer === 1) {
      setPlayer1Bid(bid)
      setCurrentPlayer(2)
    } else {
      setIsProcessing(true)
      setPlayer2Bid(bid)

      handleWinningBid(bid)
    }
  }

  const handlePlayAgain = () => {
    const [item] = bidItems
    setCurrentItem(item)

    currentItemIndex.current = 0
  }

  return (
    <Main>
      <AppBar>
        <Heading level={2} size="xsmall" margin={{ vertical: 'xsmall' }}>
          <strong>Playing Now: </strong>Player {currentPlayer}
        </Heading>
      </AppBar>
      <Box pad="large">
        <StyledWrapper>
          {roundWinner ? (
            <>
              <Text color="black" textAlign="center" weight="bold">
                Item Cost: {currentItem.currency.symbol}
                {currentItem.price}
              </Text>
              <Heading
                level={3}
                textAlign="center"
                color="brand"
                margin={{ top: '5px' }}
              >
                {roundWinner instanceof Object ? (
                  <>
                    Player {roundWinner.player} Wins with{' '}
                    {currentItem.currency.symbol}
                    {roundWinner.bid} bid!
                  </>
                ) : (
                  <>{roundWinner}</>
                )}
              </Heading>
            </>
          ) : (
            <Heading level={3} textAlign="center" color="brand">
              {currentItemIndex.current > 4 ? (
                <span>Game Over!</span>
              ) : (
                <span>Place your bid, Player {currentPlayer}!</span>
              )}
            </Heading>
          )}
          <ReBox mt={2}>
            {currentItemIndex.current === 5 && (
              <EndGame onPlayAgain={handlePlayAgain} />
            )}
            <CurrentItem
              item={currentItem}
              onBid={handleOnBid}
              previousBids={previousBids}
              isProcessing={isProcessing}
            />
            {player1Bid && <TextColumns player={1} bid={player1Bid} />}
            {player2Bid && <TextColumns player={2} bid={player2Bid} />}
          </ReBox>
        </StyledWrapper>
      </Box>
    </Main>
  )
}

export default App
