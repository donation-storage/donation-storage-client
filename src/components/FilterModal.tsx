import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SelectComponent from '../items/Select';
import type { SelectOption } from '../types/common';
import type { TagProps } from './TagComponent';
import TagComponent from './TagComponent';

const container = (isOpen: boolean) => css`
  display: ${isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 9997;
  background-color: #fff;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 220px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const contentSection = css`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px;
`;

const titleStyle = css`
  font-size: 12px;
  font-weight: 800;
`;

const selectBox = css``;

interface Props extends TagProps {
  isOpen: boolean;
  modalRef: React.MutableRefObject<Array<HTMLDivElement | null>>;
  category?: 'audio' | 'video';
}

const FilterModal = ({ isOpen, modalRef, category, ...tagProps }: Props) => {
  const router = useRouter();
  const categoryOptions = [
    { value: 'all', label: '전체' },
    { value: 'video', label: '영상도네' },
    { value: 'audio', label: '음성도네' },
  ];
  const [selectedCategory, setSelectedCategory] = useState<SelectOption>(
    categoryOptions.find((option) => option.value === category) ||
      categoryOptions[0],
  );

  const moveToCategory = (e: SelectOption) => {
    setSelectedCategory(e);
    const path = e.value === 'all' ? '/' : `/category/${e.value}`;

    void router.push(path);
  };

  return (
    <div css={container(isOpen)} ref={(el) => (modalRef.current[1] = el)}>
      <section css={contentSection}>
        <div css={titleStyle}>카테고리</div>
        <SelectComponent
          options={categoryOptions}
          selected={selectedCategory}
          onChange={(e) => {
            moveToCategory(e);
          }}
          boxCss={selectBox}
        />
      </section>
      <section css={contentSection}>
        <div css={titleStyle}>태그</div>
        <div>
          <TagComponent {...tagProps} />
        </div>
      </section>
    </div>
  );
};

export default FilterModal;
