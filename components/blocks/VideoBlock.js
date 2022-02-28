import VideoPlayer from "components/video/VideoPlayer";
import VideoEmbedded from "components/video/VideoEmbedded";

export default function VideoBlock({ record }) {
  return (
    <>
      {record.externalVideo?.url && (
        <VideoEmbedded record={record} video={record.externalVideo} />
      )}
      {record.internalVideo?.url && <VideoPlayer record={record} />}
    </>
  );
}
