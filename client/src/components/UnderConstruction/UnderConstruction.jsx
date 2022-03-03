import React from 'react';
import { ReactComponent as UnderConstructionSVG } from '../../assets/svgs/undraw_under_construction_-46-pa.svg';

function UnderConstruction() {
  return (
    <div className='contruct__container'>
      <UnderConstructionSVG className='contruct__svg' />
      <h2 className='contruct__title'>This feature is under construction!</h2>
    </div>
  );
}

export default UnderConstruction;
