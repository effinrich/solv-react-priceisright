import { grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'

export default deepMerge(grommet, {
  global: {
    colors: {
      active: 'control',
      brand: '#FF0E88',
      control: '#28A2E3',
      border: '#28A2E3',
    },
    elevation: {
      light: {
        xsmall: '0 1px 3px rgba(0,0,0,0.20)',
        small: '0px 1px 4px rgba(0,0,0,0.20)',
      },
    },
    font: {
      size: '16px',
      height: '20px',
    },
    input: {
      weight: 400,
    },
    size: {
      avatar: '36px',
      sidebar: '60px',
    },
  },

  paragraph: {
    medium: {
      size: '16px',
      height: '20px',
    },
    large: {
      size: '20px',
      height: '24px',
    },
  },
  button: {
    border: {
      radius: '10px',
    },
  },
  avatar: {
    size: {
      medium: '36px',
    },
  },
})

// export default theme
