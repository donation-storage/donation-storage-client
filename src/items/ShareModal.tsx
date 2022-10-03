import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

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
  padding: 25px 40px;
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

  useEffect(() => {
    const { Kakao } = window;
    Kakao.Share.createScrapButton({
      container: '#kakao-share',
      requestUrl: url,
    });
  }, [url]);

  return (
    <div ref={modalRef} css={container(isOpen)}>
      <div css={urlStyle}>{url}</div>
      <div css={buttonBox}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <button id="kakao-share">
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
  );
};

export default ShareModal;
