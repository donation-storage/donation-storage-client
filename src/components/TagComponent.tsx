import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import { primaryColor } from '../styles/common';

const tagComponent = css`
  display: flex;
  width: 300px;
  flex-wrap: wrap;
  gap: 10px;
`;

const tagStyle = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-radius: 50px;
  height: 30px;
  background-color: ${isSelected ? primaryColor : '#d1d1d1'};
  cursor: pointer;
`;

interface Props {
  selectedTag: string;
  tags: string[];
}

const TagComponent = ({ selectedTag, tags }: Props) => {
  const router = useRouter();

  return (
    <div css={tagComponent}>
      {tags.map((tag, index) => (
        <span
          key={index}
          css={tagStyle(tag === selectedTag)}
          onClick={() => {
            void router.push(`/tag/${tag}`);
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagComponent;
