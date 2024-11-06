import React from 'react';
import Bubble from './Bubble.js'; 
import { MessageProvider } from './MessageContext.js';

function App() {
  return (
    <MessageProvider>
      <Bubble />
    </MessageProvider>
  );
}

export default App;
