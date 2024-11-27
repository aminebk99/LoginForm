import { useEffect, useState } from 'react';
import axios from 'axios'; 

interface UserData {
  username: string;
  email: string;
}

function Dashboard() {
  const [data, setData] = useState<UserData | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8082/users/data", {
            withCredentials: true,
        });
        setData(res.data); 
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className=' flex flex-col'>
      <h2 className='text-3xl'>{data ? `Welcome ${data.username}` : 'Loading...'}</h2>
      <span>{data?.email}</span>

        </div>
      
    </div>
  );
}

export default Dashboard;
