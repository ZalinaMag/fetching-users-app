import { User } from "../api/users";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p>
        <strong>Address:</strong> {user.address.street} {user.address.suite}<br />
        {user.address.city} {user.address.zipcode}<br />
        <a className="map-button"
          href={`https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Google Maps
        </a>
      </p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p>
      <strong>Website:</strong>{" "}
      <a className="website-link" href={user.website.startsWith("http") ? user.website : `http://${user.website}`} target="_blank" rel="noopener noreferrer">
        {user.website}
      </a>
      </p>
      <p><strong>Company:</strong> {user.company.name}<br />
      - {user.company.catchPhrase}<br />
      - {user.company.bs}</p>
    </div>
  );
}