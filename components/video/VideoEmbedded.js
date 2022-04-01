import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const VideoEmbedded = (props) => {
  const size = useWindowSize();

  const { id, video, autoPlay, loop, muted, controls } = props;
  const ref = useRef();
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (ref?.current) {
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
