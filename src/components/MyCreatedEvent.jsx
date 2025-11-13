import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyCreatedEvent = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;
    axiosSecure.get(`/my-created-events?email=${user.email}`).then((res) => {
      setEvents(res.data);
    });
  }, [user, axiosSecure, loading]);

  const handleDeleteEvent = (id) => {
    if (!id) {
      console.error("No event ID provided to delete.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/events/${id}`);
          console.log(res);

          if (res?.data?.success) {
            // Remove deleted event from state
            setEvents((prev) => prev.filter((event) => event._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Your event has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete event.",
              icon: "error",
            });
          }
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
          });
        }
      }
    });
  };

  

  return (
    <div>
      <h2>My Join event list: {events.length}</h2>
      <div className="overflow-x-auto">
        {events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">No data available</p>
          </div>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Event Name</th>
                <th>Event Category</th>
                <th>Event date</th>
                <th>Event Location</th>
                <th>Event Creator Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id || index}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.category}</td>
                  <td>
                    {new Date(event.event_date).toISOString().split("T")[0]}
                  </td>
                  <td>{event.location}</td>
                  <td>{event.created_by}</td>
                  <td>
                    <Link to={`/updateEvent/${event._id}`}>
                      <button className="btn btn-outline bg-[#3c576e] text-white">
                        Update event
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="btn btn-outline bg-[#3c576e] text-white"
                    >
                      Delete event
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyCreatedEvent;
