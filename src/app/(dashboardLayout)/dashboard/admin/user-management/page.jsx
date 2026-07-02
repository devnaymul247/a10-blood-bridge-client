import UsersTable from "./Userstable";


export default async function UserManagementPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/admin/users`,
    {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      cache: 'no-store',
    }
  );
  const data = await res.json();
  const users = Array.isArray(data) ? data : data?.data || [];

  return <UsersTable users={users} />;
}