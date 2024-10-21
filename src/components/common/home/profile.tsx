import React from 'react';
import Main from './profile/main';
import Church from './profile/church';
import Following from './profile/following';

export default function Profile() {
  return (
    <div className="flex flex-col gap-2">
      <Main />
      <Church />
      <Following />
    </div>
  );
}
