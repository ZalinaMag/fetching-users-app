import { useState, useEffect } from "react";
import { fetchUsers, User } from "../api/users";
import UserCard from "./UserCard";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');

  const filteredUsers = users.filter(user =>
    user.company.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();

      function stripTitle(name: string): string {
        const titles = ["Mr.", "Mrs.", "Ms.", "Miss"];
        for (const title of titles) {
          if (name.startsWith(title + " ")) {
            return name.slice(title.length + 1);
          }
        }
        return name;
      }
      
      const sortedData = data.sort((a, b) => {
        const nameA = stripTitle(a.name);
        const nameB = stripTitle(b.name);
        return nameA.localeCompare(nameB);
      });

      setUsers(sortedData);
    };
    loadUsers();
  }, []);

  return (
    <>
      <div className="users-header">
        <h1>Users</h1>
        <div className="filter-container">
            <input
            type="text"
            placeholder="Filter by company name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            />
        </div>
      </div>
      <div className="users-container">
        {filteredUsers.length ? (filteredUsers.map((user) => (
          <UserCard key={user.id} user={user}/>
          ))
        ) : (
          <h3>No users were found</h3>
        )}
      </div>
    </>
  );
};