import { Suspense } from 'react';
import NewMember from './pageClient';

export default function Page() {
  return (
    <Suspense>
      <NewMember />
    </Suspense>
  );
}
