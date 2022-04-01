import ReactPlayer from "react-player";

export default function VideoPlayer(record) {
  const mp4Url = record.record.internalVideo.video.mp4Url;
  return (
    <ReactPlayer
      fluid={true}
      playing={true}
      autoPlay={true}
      width="100%"
      height="100%"
      url={mp4Url}
      controls={true}
      muted={record.record.muted}
    />
  );
}
