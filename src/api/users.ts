import axios from "axios";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}