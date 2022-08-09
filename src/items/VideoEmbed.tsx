import { css } from '@emotion/react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import urlParser from 'js-video-url-parser';
import { useCallback, useEffect, useState } from 'react';

const noneEmbedBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 640px;
  height: 360px;
  background-color: #f6f6f6;
  border-radius: 5px;
  color: #606060;
  font-weight: bold;
  gap: 10px;
`;

interface Props {
  videoUrl: string;
  startTime?: number;
}

const VideoEmbed = ({ videoUrl, startTime }: Props) => {
  const [embedConfig, setEmbedConfig] = useState({ status: '', id: '' });

  const handleEmbedConfig = useCallback(() => {
    const parsedUrl = urlParser.parse(videoUrl);

    if (!parsedUrl) {
      setEmbedConfig({
        status: 'failed',
        id: '',
      });

      return;
    }

    const { mediaType, id, provider } = parsedUrl;

    if (provider === 'twitch') {
      if (mediaType === 'video' && id) {
        setEmbedConfig({
          status: 'twitch/video',
          id,
        });

        return;
      } else if (mediaType === 'clip' && id) {
        const clipId = videoUrl.split('clip/')[1];
        setEmbedConfig({
          status: 'twitch/clip',
          id: clipId,
        });

        return;
      }
    }

    if (provider === 'youtube' && mediaType === 'video' && id) {
      setEmbedConfig({
        status: 'youtube/video',
        id,
      });

      return;
    }

    setEmbedConfig({
      status: 'failed',
      id: '',
    });
  }, [videoUrl]);

  useEffect(() => {
    handleEmbedConfig();
  }, [handleEmbedConfig]);

  if (embedConfig.status === 'twitch/video') {
    return (
      <iframe
        src={`https://player.twitch.tv/?video=${embedConfig.id}&parent=${process.env.NEXT_PUBLIC_CLINET_DOMAIN}&autoplay=false&time=${startTime}s`}
        height="360"
        width="640"
        allowFullScreen={true}
      ></iframe>
    );
  }

  if (embedConfig.status === 'twitch/clip') {
    return (
      <iframe
        src={`https://clips.twitch.tv/embed?clip=${embedConfig.id}&parent=${process.env.NEXT_PUBLIC_CLINET_DOMAIN}`}
        frameBorder="0"
        allowFullScreen={true}
        scrolling="no"
        height="360"
        width="640"
      ></iframe>
    );
  }

  if (embedConfig.status === 'youtube/video') {
    return (
      <iframe
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${embedConfig.id}?origin=${process.env.NEXT_PUBLIC_CLINET_URL}&start=${startTime}`}
        frameBorder="0"
      ></iframe>
    );
  }

  return (
    <div css={noneEmbedBox}>
      <FontAwesomeIcon icon={faCircleExclamation} />
      <span>올바르지 않은 URL입니다.</span>
    </div>
  );
};

export default VideoEmbed;
