import React from 'react'

const modalContext = React.createContext({
  onModalClose: () => {},
});

export default modalContext;