import { auth } from '@/lib/auth';
import DonorProfileEditor from './DonorProfileEditor';
import { headers } from 'next/headers';

export default async function DonorProfilePage({ params }) {
  // it's for server component.
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const donorUser = session?.user;
    console.log(donorUser);

  return (
    <div>
        <DonorProfileEditor donor={donorUser} />
    </div>
  )
}