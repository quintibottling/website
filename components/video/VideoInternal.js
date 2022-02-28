const VideoInternal = (props) => {
  const { id, videoFile, autoPlay, ...other } = props;
  return (
    <div key={id}>
      <video autoPlay={autoPlay || false} {...other} style={{ width: "100%" }}>
        <source src={videoFile?.url} type={videoFile?.mimeType} />
        Sorry, your browser doesn`&apos;`t support embedded videos.
      </video>
    </div>
  );
};

export default VideoInternal;
