import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

// Define an interface for the 'data' structure
interface UserData {
  username: string;
  // Add other properties if needed, like:
  email: string;
  // age: number;
}

function Dashboard() {
  // Define the type of 'data' state as UserData | null (since the data could be initially empty)
  const [data, setData] = useState<UserData | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8082/users/data", {
            withCredentials: true, // Set this to true if you need to include credentials
        });
        setData(res.data); // Assuming the response contains data in the 'UserData' format
      } catch (error) {
        console.error("Error fetching data:", error); // Error handling
      }
    };

    fetchData(); // Calling fetchData inside useEffect
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {/* Render the username if 'data' is not null */}
      <h2 className='text-3xl'>{data ? `Welcome ${data.username}` : 'Loading...'}</h2>
      <br />
      <span>{data?.email}</span>
    </div>
  );
}

export default Dashboard;
