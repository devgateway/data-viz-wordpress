import React from 'react';
import { ExampleBlockAttributes } from './types';

const BlockSave = (props: { attributes: ExampleBlockAttributes }) => {
  return <div data-text={props.attributes.text} />;
};

export default BlockSave;