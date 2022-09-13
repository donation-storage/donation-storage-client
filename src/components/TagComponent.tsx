import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import { primaryColor } from '../styles/common';

const tagComponent = css`
  display: flex;
  margin-right: auto;
  max-width: 300px;
  width: 100%;
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
  max-width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${isSelected ? primaryColor : '#dfdfdf'};
  color: ${isSelected ? '#fff' : '#4d4d4d'};
  font-weight: ${isSelected ? 900 : 'normal'};
  border: 1px solid ${isSelected ? primaryColor : '#7f7f7f'};
  cursor: pointer;
  @media (max-width: 1023px) {
    height: 23px;
    padding: 0 7px;
    font-size: 14px;
  }
`;

export interface TagProps {
  selectedTag: string;
  tags: Array<{ tagName: string }>;
}

const TagComponent = ({ selectedTag, tags }: TagProps) => {
  const router = useRouter();

  return (
    <div css={tagComponent}>
      {tags.map((tag, index) => (
        <span
          key={index}
          css={tagStyle(tag.tagName === selectedTag)}
          onClick={() => {
            void router.push(`/tag/${tag.tagName}`);
          }}
        >
          {tag.tagName}
        </span>
      ))}
    </div>
  );
};

export default TagComponent;
