import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contex/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyJoinEvent = () => {
      const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/my-join-event?email=${user.email}`)
    .then(data =>{
      setEvents(data.data);
    })
  }, [user, axiosSecure])

    return (
         <div>
      <h2>My Join event list: {events.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Event Name</th>
              <th>Event date</th>
              <th>Event Location</th>
              <th>Event Creator Email</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{event.name}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>{event.event_date}</td>
                <td>{event.location}</td>
                <td>{event.created_by}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyJoinEvent;