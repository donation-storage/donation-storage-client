import { css } from '@emotion/react';

import { primaryColor } from '../styles/common';

const container = css`
  display: flex;
`;

const checkboxInput = css`
  display: none;
  &:checked + label div {
    transform: translateX(24px);
  }
`;

const switchLabel = css`
  position: relative;
  height: 26px;
  width: 50px;
  border-radius: 50px;
  background-color: #e9e9e9;
`;

const ball = css`
  position: absolute;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.2s linear;
  background-color: ${primaryColor};
  cursor: pointer;
`;

interface Props {
  isChecked: boolean;
  handleToogle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ isChecked, handleToogle }: Props) => (
  <div css={container}>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleToogle}
      id="switch-input"
      css={checkboxInput}
    />
    <label htmlFor="switch-input" css={switchLabel}>
      <div css={ball} />
    </label>
  </div>
);

export default Switch;
