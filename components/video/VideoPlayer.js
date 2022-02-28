import ReactPlayer from "react-player";

export default function VideoPlayer(record) {
  const streamingUrl = record.record.internalVideo.video.streamingUrl;
  // const thumbnailUrl = record.record.internalVideo.video.thumbnailUrl;
  const mp4Url = record.record.internalVideo.video.mp4Url;
  return (
    <ReactPlayer
      fluid={true}
      // light={thumbnailUrl}
      playing={true}
      autoPlay={true}
      width="100%"
      height="100%"
      url={mp4Url}
      controls={true}
      muted={record.record.mudeted}
    />
  );
}
