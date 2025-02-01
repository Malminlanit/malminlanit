import React, { useState, useRef } from "react";

const IntroVideo = ({ onFinish }: { onFinish: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ohitetaan video, kun käyttäjä klikkaa "Skip"
  const skipVideo = () => {
    setIsVisible(false);
    onFinish();
  };

  // Kun video loppuu, piilotetaan se
  const handleVideoEnd = () => {
    setIsVisible(false);
    onFinish();
  };

  return (
    isVisible && (
      <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          onLoadedData={() => console.log("Video loaded!")} // Debuggaus
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Skip-painike */}
        <button
          onClick={skipVideo}
          className="absolute top-5 right-5 bg-white text-black px-4 py-2 rounded-md shadow-lg hover:bg-gray-300"
        >
          Skip
        </button>
      </div>
    )
  );
};

export default IntroVideo;
