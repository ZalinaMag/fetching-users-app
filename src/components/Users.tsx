import { useState, useEffect, ChangeEvent } from "react";
import { fetchUsers, User } from "../api/users";
import UserCard from "./UserCard";


const titles = ["Mr.", "Mrs.", "Ms.", "Miss"];

const stripTitle = (name: string): string => {
  for (const title of titles) {
    const prefix = `${title} `;
    if (name.startsWith(prefix)) {
      return name.slice(prefix.length);
    }
  }
  return name;
}

const sortUsersByName = (users: User[]): User[] => {
  return [...users].sort((a, b) =>
    stripTitle(a.name).localeCompare(stripTitle(b.name))
  );
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.company.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();

      const sortedUsers = sortUsersByName(data);
      setUsers(sortedUsers);
    };
    loadUsers();
  }, []);

  return (
    <>
      <div className="users-header">
        <h1>Users directory</h1>
        <div className="filter-container">
            <input
            type="text"
            placeholder="Filter by company name"
            value={filter}
            onChange={handleFilterChange}
            />
        </div>
      </div>
      <div className="users-container">
        {filteredUsers.length ? (filteredUsers.map((user) => (
          <UserCard key={user.id} user={user}/>
          ))
        ) : (
          <h3>No users found</h3>
        )}
      </div>
    </>
  );
};