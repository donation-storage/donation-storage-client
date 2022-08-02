import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import { fontPyeongChangLight, primaryColor } from '../styles/common';

interface Props {
  category?: 'all' | 'video' | 'audio';
}

const categoryContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const categoryButton = (isSelected: boolean) => css`
  ${fontPyeongChangLight}
  font-size: 18px;
  width: 100px;
  height: 30px;
  ${isSelected && `background-color: ${primaryColor};`}
  ${isSelected && 'color: #fff;'}
  ${isSelected && 'font-weight: 900;'}
  border-radius: 3px;
`;

const Category = (props: Props) => {
  const router = useRouter();
  const category = props.category || 'all';

  const moveToCategory = (categoryParam?: string) => {
    if (categoryParam) {
      return void router.push(`/category/${categoryParam}`);
    }

    void router.push('/');
  };

  return (
    <div css={categoryContainer}>
      <button
        css={categoryButton(category === 'all')}
        onClick={() => {
          moveToCategory();
        }}
      >
        전체
      </button>
      <button
        css={categoryButton(category === 'video')}
        onClick={() => {
          moveToCategory('video');
        }}
      >
        영상도네
      </button>
      <button
        css={categoryButton(category === 'audio')}
        onClick={() => {
          moveToCategory('audio');
        }}
      >
        음성도네
      </button>
    </div>
  );
};

export default Category;
