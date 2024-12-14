import React from 'react';
import Webcam from 'react-webcam';

const CameraFeed = () => {
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "environment",
    };

    return (
        <div>
            <h2>Camera Feed</h2>
            <Webcam
                audio={false}
                height={480}
                screenshotFormat="image/jpeg"
                width={640}
                videoConstraints={videoConstraints}
            />
        </div>
    );
};

export default CameraFeed;
