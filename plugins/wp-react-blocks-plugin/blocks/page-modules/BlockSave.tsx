import React from 'react';
import { PageModulesBlockAttributes } from './types';

const SaveComponent = (props: {attributes: PageModulesBlockAttributes}) => {
    const { navLabel, topTopLabel, previewMode } = props.attributes;
    return (
      <div
        className={"viz-component"}
        data-component={"pageModules"}
        data-nav-label={navLabel}
        data-to-top-label={topTopLabel}
        data-preview-mode={previewMode}
      />
    );
  };
  
export default SaveComponent;