import React from 'react';
import ChatBox from './components/ChatBox';
import CameraFeed from './components/CameraFeed';
import Navbar from './components/Navbar';
import ImageGen from './components/ImageGen';

function App() {
    return (
        <div>
          <Navbar />
          {/* <ImageGen /> */}
            {/* <h1>Vision Voice App</h1> */}
            {/* <CameraFeed /> */}
            <ChatBox />
        </div>
    );
}

export default App;
