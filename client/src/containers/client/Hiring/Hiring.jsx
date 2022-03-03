import React, { useEffect } from 'react';
import UnderConstruction from '../../../components/UnderConstruction/UnderConstruction';

function Hiring() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <main className='hiring__panel'>
      <UnderConstruction />
    </main>
  );
}

export default Hiring;
