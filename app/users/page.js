'use client'
import MainLayout from '@/components/templates/MainLayout';
import CustomTable from '@/components/molecules/CustomTable';



export default function UsersPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2023-05-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', lastLogin: '2023-05-10' },
    // ... more users
  ];

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            {value.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {value}
        </span>
      )
    },
    { key: 'lastLogin', header: 'Last Login' },
  ];

  const handleRowClick = (user) => {
    console.log('User clicked:', user);
    // router.push(`/users/${user.id}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <CustomTable
          data={users}
          columns={columns}
          pageSize={5}
          hoverEffect
          striped
          rounded
          bordered
          onRowClick={handleRowClick}
          className="shadow-lg"
        />
      </div>
    </MainLayout>
  );
}