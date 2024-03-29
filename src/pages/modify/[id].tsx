/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, keyframes } from '@emotion/react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import urlParser from 'js-video-url-parser';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  getOnePostApi,
  getTwitchClipTitleApi,
  getTwitchVideoTitleApi,
  getYouTubeTitleApi,
  modifyAudioApi,
  modifyVideoApi,
} from '../../apis/post';
import { getUserInfoForSSR } from '../../apis/user';
import Modal from '../../items/Modal';
import UploadAudio from '../../items/UploadAudio';
import UploadVideoUrl from '../../items/UploadVideoUrl';
import { fontSCroreDream, primaryColor } from '../../styles/common';
import type { PostConfig } from '../../types/api';
import {
  formatStartTimeToString,
  isYoutueUrl,
  regexTag,
  srcToFile,
} from '../../utills/common';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookie = context.req.headers.cookie;
    const userData = await getUserInfoForSSR(cookie!);
    const viewResponse = await getOnePostApi(context.params!.id as string);

    if (String(userData.userName) !== viewResponse?.data.insertUserId) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {},
      };
    }

    return {
      props: {
        data: viewResponse?.data,
      },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }
};

const container = css`
  background-color: #f7fafb;
`;

const innerContainer = css`
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.1);
`;

const titleInput = css`
  width: 100%;
  height: 70px;
  font-size: 45px;
  font-weight: bold;
  ::placeholder {
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    color: #7a7a7a;
  }
`;

const titleBorder = css`
  margin: 10px 0;
  width: 70px;
  height: 7px;
  background-color: #252525;
`;

const tagBox = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin: 15px 0;
`;

const tagStyle = css`
  ${fontSCroreDream}
  padding: 7px 13px;
  background-color: #f8f8f8;
  border-radius: 50px;
  color: ${primaryColor};
`;

const tagInput = css`
  padding: 7px 0px;
  ::placeholder {
    ${fontSCroreDream}
  }
`;

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const tagTooltip = (isVisible: boolean) => css`
  display: ${isVisible ? 'flex' : 'none'};
  position: absolute;
  bottom: -85px;
  background-color: #343434;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  z-index: 9999;
  width: 280px;
  padding: 10px;
  animation: ${fadeInDown} 0.4s;
  max-width: 95%;
`;

const toolbarContainer = css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 63px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  padding: 0 20px;
  border-radius: 0 0 10px 10px;
`;

const backButton = css`
  display: flex;
  gap: 5px;
  font-size: 18px;
  > span {
    display: flex;
    align-items: center;
    margin-top: 2px;
  }
`;

const uploadButton = css`
  ${fontSCroreDream}
  font-size: 16px;
  font-weight: 700;
  background-color: ${primaryColor};
  color: white;
  border-radius: 4px;
  padding: 10px 15px;
  :hover {
    transition: 0.2s;
    background-color: #7c57c2;
  }
`;

interface Props {
  data: PostConfig;
}

const Modify = (props: Props) => {
  const { postSeq, postName, tag, link, startTime, totalTime } = props.data;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [title, setTitle] = useState(postName);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [onTagFocus, setOnTagFocus] = useState(false);
  const [tags, setTags] = useState<string[]>(tag);
  const type = props.data.type === 'audio' ? 'audio' : 'video';
  const [audio, setAudio] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState(link);
  const [embedConfig, setEmbedConfig] = useState({
    status: 'none',
    id: '',
  });
  const [startHour, setStartHour] = useState(
    startTime?.slice().split(':')[0] || '',
  );
  const [startMinute, setStartMinute] = useState(
    startTime?.slice().split(':')[1] || '',
  );
  const [startSecond, setStartSecond] = useState(
    startTime?.slice().split(':')[2] || '',
  );
  const [duration, setDuration] = useState(totalTime || '');
  const [videoTitle, setVideoTitle] = useState(props.data.videoTitle || '');

  const formatFileName = useCallback(() => {
    const fileName = link.split('/').reverse()[0];

    return decodeURIComponent(fileName);
  }, [link]);

  const getAudioFile = useCallback(async () => {
    const blob = await srcToFile(link, formatFileName());
    setAudio(blob);
  }, [link, formatFileName]);

  useEffect(() => {
    if (type === 'audio') {
      void getAudioFile();
    }
  }, [getAudioFile, type]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onEnterTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const checkedTag = regexTag(e.currentTarget.value);

    if (checkedTag && tags.length < 8) {
      const newTags = new Set([...tags, checkedTag]);
      setTags([...newTags]);
    }

    tagInputRef.current!.value = '';
  };

  const onBackSpaceTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      tags.length > 0 &&
      e.key === 'Backspace' &&
      tagInputRef.current!.value === ''
    ) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleDuration = (second: number) => {
    if (second > 60 * 10) {
      setModalContent('10분 이상의 음성파일은 업로드가 불가능합니다.');
      setIsModalOpen(true);
      setAudio(null);

      return;
    }

    const formatDuration = new Date(second * 1000).toISOString().slice(14, 19);
    setDuration(formatDuration);
  };

  const onChangeVideoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const onChangeStartHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '');
    setStartHour(digit);
  };

  const onChangeStartMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '');
    setStartMinute(digit);
  };

  const onChangeStartSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '');
    setStartSecond(digit);
  };

  const onBlurStartHour = (e: React.FocusEvent<HTMLInputElement>) => {
    const hour = e.target.value;

    if (hour === '0' || hour === '00') {
      setStartHour('');
    } else if (hour.length === 1) {
      setStartHour(`0${hour}`);
    }
  };

  const onBlurStartMinute = (e: React.FocusEvent<HTMLInputElement>) => {
    const minute = e.target.value;
    const numMinute = Number(e.target.value);

    if (minute === '0' || minute === '00') {
      setStartMinute('');
    } else if (minute.length === 1) {
      setStartMinute(`0${minute}`);
    } else if (numMinute > 59) {
      const newMinute = String(numMinute - 60);
      setStartHour(`0${Number(startHour) + 1}`.slice(-2));
      setStartMinute(`0${newMinute}`.slice(-2));
    }
  };

  const onBlurStartSecond = (e: React.FocusEvent<HTMLInputElement>) => {
    const second = e.target.value;
    const numSecond = Number(e.target.value);

    if (second === '0' || second === '00') {
      setStartSecond('');
    } else if (second.length === 1) {
      setStartSecond(`0${second}`);
    } else if (numSecond > 59) {
      const newSecond = String(numSecond - 60);
      setStartMinute(`0${Number(startMinute) + 1}`.slice(-2));
      setStartSecond(`0${newSecond}`.slice(-2));
    }
  };

  const onChangeEmbedUrl = useCallback(async () => {
    if (videoUrl === '') {
      setEmbedConfig({
        status: 'none',
        id: '',
      });

      return;
    }

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
        const twitchVideoTitle = await getTwitchVideoTitleApi(
          id.replace('v', ''),
        );
        setVideoTitle(twitchVideoTitle || '');
        setEmbedConfig({
          status: 'twitch/video',
          id,
        });

        return;
      } else if (mediaType === 'clip' && id) {
        const clipId = videoUrl.split('clip/')[1];
        const twitchClipTitle = await getTwitchClipTitleApi(clipId);
        setVideoTitle(twitchClipTitle || '');
        setEmbedConfig({
          status: 'twitch/clip',
          id: clipId,
        });

        return;
      }
    }

    if (provider === 'youtube' && mediaType === 'video' && id) {
      const youtubeTitle = await getYouTubeTitleApi(id);
      setVideoTitle(youtubeTitle || '');

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
    void onChangeEmbedUrl();
  }, [onChangeEmbedUrl]);

  const checkUpload = () => {
    if (title === '') {
      setModalContent('제목을 입력해주세요.');
      setIsModalOpen(true);

      return false;
    } else if (tags.length < 2) {
      setModalContent('태그를 입력해주세요.(최소 2개)');
      setIsModalOpen(true);

      return false;
    } else if (type === 'audio' && !audio) {
      setModalContent('파일을 업로드해주세요.');
      setIsModalOpen(true);

      return false;
    } else if (type === 'video' && videoUrl === '') {
      setModalContent('URL을 입력해주세요.');
      setIsModalOpen(true);

      return false;
    } else if (type === 'video' && embedConfig.status === 'failed') {
      setModalContent('올바르지 않은 URL입니다.');
      setIsModalOpen(true);

      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!checkUpload()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('postName', title);

      for (const tagName of tags) {
        formData.append('tagArray', tagName);
      }

      if (type === 'audio') {
        formData.append('type', 'a');
        formData.append('file', audio!);
        formData.append('totalTime', duration);
      } else if (type === 'video') {
        formData.append('type', isYoutueUrl(videoUrl) ? 'y' : 't');
        formData.append('link', videoUrl);
        formData.append(
          'startTime',
          formatStartTimeToString(startHour, startMinute, startSecond),
        );
        formData.append('videoTitle', videoTitle);
      }

      const res =
        type === 'audio'
          ? await modifyAudioApi(postSeq, formData)
          : await modifyVideoApi(postSeq, formData);

      if (res?.code === 1) {
        void router.push(`/view/${postSeq}`);
      } else {
        throw new Error('failed to modify');
      }
    } catch {
      setModalContent('실패하였습니다.');
      setIsModalOpen(true);
    }
  };

  return (
    <div css={container}>
      <div css={innerContainer}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          css={titleInput}
          value={title}
          onChange={onChangeTitle}
        />
        <div css={titleBorder} />
        <div css={tagBox}>
          {tags.map((tagName, id) => (
            <button
              css={tagStyle}
              key={id}
              onClick={() => {
                setTags(tags.filter((_, index) => id !== index));
              }}
            >
              {tagName}
            </button>
          ))}
          <input
            ref={tagInputRef}
            type="text"
            css={tagInput}
            placeholder="태그를 입력하세요"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onEnterTags(e);
              }
            }}
            onKeyDown={onBackSpaceTags}
            onFocus={() => setOnTagFocus(true)}
            onBlur={() => setOnTagFocus(false)}
          />
          <div css={tagTooltip(onTagFocus)}>
            엔터를 입력하여 태그를 등록할 수 있습니다.
            <br />
            (최소 2개, 최대 8개)
            <br />
            등록된 태그를 클릭하면 삭제됩니다.
          </div>
        </div>
        {type === 'audio' ? (
          <UploadAudio
            file={audio}
            setFile={setAudio}
            setDuration={handleDuration}
          />
        ) : (
          <UploadVideoUrl
            videoUrl={videoUrl}
            embedConfig={embedConfig}
            onChangeVideoUrl={onChangeVideoUrl}
            startHour={startHour}
            onChangeStartHour={onChangeStartHour}
            onBlurStartHour={onBlurStartHour}
            startMinute={startMinute}
            onChangeStartMinute={onChangeStartMinute}
            onBlurStartMinute={onBlurStartMinute}
            startSecond={startSecond}
            onChangeStartSecond={onChangeStartSecond}
            onBlurStartSecond={onBlurStartSecond}
          />
        )}
      </div>
      <div css={toolbarContainer}>
        <button
          css={backButton}
          onClick={() => {
            void router.back();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>취소</span>
        </button>
        <button
          css={uploadButton}
          onClick={() => {
            void onSubmit();
          }}
        >
          수정하기
        </button>
      </div>
      {isModalOpen && (
        <Modal
          content={modalContent}
          onClose={() => {
            setIsModalOpen(false);
            setModalContent('');
          }}
        />
      )}
    </div>
  );
};

export default Modify;
