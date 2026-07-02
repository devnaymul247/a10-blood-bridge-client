import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AdminProfileEditor from './AdminProfileEditor';

export default async function DonorProfilePage({ params }) {
  // it's for server component.
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const adminUser = session?.user;
    console.log(adminUser);

  return (
    <div>
        <AdminProfileEditor admin={adminUser} />
    </div>
  )
}