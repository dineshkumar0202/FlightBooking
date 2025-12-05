import React from 'react'

const UserList = () => {
  return (
    <div className="container-page py-8">
      <h1 className="text-xl font-semibold mb-4 text-slate-900">Users</h1>
      <p className="text-sm text-slate-500">
        Fetch and list users from <code>/api/admin/users</code>.
      </p>
    </div>
  )
}

export default UserList
