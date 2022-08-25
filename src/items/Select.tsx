import type { SerializedStyles } from '@emotion/react';
import Select from 'react-select';

import { primaryColor } from '../styles/common';
import type { SelectOption } from '../types/common';

interface Props {
  options: SelectOption[];
  selected: SelectOption;
  onChange: (e: SelectOption) => void;
  boxCss?: SerializedStyles | SerializedStyles[];
}

const SelectComponent = ({ options, selected, onChange, boxCss }: Props) => (
  <div css={boxCss}>
    <Select
      options={options}
      value={selected}
      onChange={(e) => onChange(e!)}
      styles={{
        control: (provided) => ({
          ...provided,
          border: 'none',
          boxShadow: 'none',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? primaryColor : '#fff',
          color: state.isSelected ? '#fff' : '#000',
        }),
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  </div>
);

export default SelectComponent;
