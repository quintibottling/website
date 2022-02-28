import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const VideoEmbedded = (props) => {
  const size = useWindowSize();

  const { id, video, autoPlay, loop, muted, controls } = props;
  const ref = useRef();
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (ref?.current) {
      //&& !width
      const rect = ref.current.getBoundingClientRect().toJSON();
      setWidth(rect.width);
    }
  }, [ref?.current, width, size]);

  return (
    <div ref={ref} key={id} style={{ width: "100%", backgroundColor: "#000" }}>
      {width && (
        <ReactPlayer
          controls={controls}
          muted={muted}
          width={width}
          autoPlay={autoPlay}
          height={(width / 4) * 3}
          loop={loop}
          url={video.url}
        />
      )}
    </div>
  );
};

export default VideoEmbedded;
