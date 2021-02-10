import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Main, Box, Heading, Text } from 'grommet'
import { Box as ReBox } from 'reflexbox'

import AppBar from 'components/AppBar'
import CurrentItem from 'components/CurrentItem'
import EndGame from 'components/EndGame'
import TextColumns from 'components/TextColumns'
import bidItems from 'store/bid-items.json'

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
  }, [currentItemIndex])

  const handleWinningBid = useCallback(
    (bid) => {
      if (currentItem && player1Bid && bid) {
        const playersArray = [
          { player: 1, bid: parseFloat(player1Bid) },
          { player: 2, bid: parseFloat(bid) },
        ]

        const itemPrice = currentItem.price
        const winner = playersArray
          .filter((player) => player.bid <= itemPrice)
          .reduce((prev, current) => (prev.bid > current.bid ? prev : current))

        setRoundWinner(winner)

        const timeout = setTimeout(() => {
          handleResetAndContinue()
        }, 3000)

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

      const timeout = setTimeout(() => {
        handleWinningBid(bid)
      }, 3000)

      return () => clearTimeout(timeout)
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
        <Box style={{ margin: '0 auto' }}>
          {roundWinner ? (
            <Heading level={3} textAlign="center" color="brand">
              Player {roundWinner.player} Wins with{' '}
              {currentItem.currency.symbol}
              {roundWinner.bid} bid!
            </Heading>
          ) : (
            <Heading level={3} textAlign="center" color="brand">
              {currentItemIndex.current > 5 ? (
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
            {player1Bid && !roundWinner && (
              <TextColumns player={1} bid={player1Bid} />
            )}
            {player2Bid && !roundWinner && (
              <TextColumns player={2} bid={player2Bid} />
            )}
            {roundWinner && (
              <Text color="black">
                Item Cost: {currentItem.currency.symbol}
                {currentItem.price}
              </Text>
            )}
          </ReBox>
        </Box>
      </Box>
    </Main>
  )
}

export default App
