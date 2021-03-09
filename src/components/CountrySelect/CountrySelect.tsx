import React from 'react';
import Select from 'react-select';
import './countryselect.css'
// import countryList from 'react-select-country-list'
import { colourOptions, groupedOptions } from './data';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '35px',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
};

const formatGroupLabel = (data: { label: React.ReactNode; options: string | any[]; }) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default () => (
  <Select className="country-select"
    defaultValue={[1]}
    options={groupedOptions}
  />
);