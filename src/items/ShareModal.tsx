import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

const background = (isOpen: boolean) => css`
  position: absolute;
  display: ${isOpen ? 'flex' : 'none'};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const container = (isOpen: boolean) => css`
  position: absolute;
  display: ${isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px 25px;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.075);
`;

const buttonBox = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const urlStyle = css`
  border: 1px solid #b8b8b8;
  padding: 3px 12px;
  border-radius: 2px;
  background-color: #f3f3f3;
  color: #666666;
`;

const urlCopyButton = css`
  font-weight: 500;
  padding: 4px 7px;
  :hover {
    background-color: #efefef;
    border-radius: 5px;
  }
  transition: all 0.5s;
`;

interface Props {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  copyUrl: (string: string) => void;
}

const ShareModal = ({ isOpen, modalRef, onClose, copyUrl }: Props) => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_CLINET_ORIGIN}${router.asPath}`;

  const sharekakao = () => {
    const { Kakao } = window;

    Kakao.Share.sendScrap({
      requestUrl: url,
    });
  };

  return (
    <div css={background(isOpen)}>
      <div ref={modalRef} css={container(isOpen)}>
        <div css={urlStyle}>{url}</div>
        <div css={buttonBox}>
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <button
            onClick={() => {
              sharekakao();
            }}
          >
            <img
              src="/images/icon-kakao.png"
              alt="kakao"
              css={css`
                width: 32px;
                height: 32px;
              `}
            />
          </button>
          <button
            onClick={() => {
              copyUrl(url);
              onClose();
            }}
            css={urlCopyButton}
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
