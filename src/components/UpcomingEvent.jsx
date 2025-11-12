import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import EventCard from "./EventCard";

const UpcomingEvent = () => {
  const data = useLoaderData();
  const [events, setEvents] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const filterUpcomingEvents = () => {
      const currentDate = new Date();
      const currentDateStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      const upcoming = events.filter((event) => {
        const eventDate = new Date(event.event_date);
        const eventDateStart = new Date(
          eventDate.getFullYear(),
          eventDate.getMonth(),
          eventDate.getDate()
        );

        return eventDateStart >= currentDateStart;
      });

      setUpcomingEvents(upcoming);
    };

    filterUpcomingEvents();
  }, [events]);

  // Remove duplicates by _id from upcoming events
  const uniqueEvents = Array.from(
    new Map(upcomingEvents.map((event) => [event._id, event])).values()
  );
  //   const handleSearch = (e) => {
  //   e.preventDefault();
  //   const search_text = e.target.search.value.trim();
  //   if (!search_text) return;

  //   setLoading(true);

  //   fetch(`https://3d-models-hub-server-kappa.vercel.app/search?search=${search_text}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       // Make sure we’re using the right data shape
  //       setModels(data.result || data || []);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // };

  // Remove duplicates by _id
  // const uniqueEvents = Array.from(
  //   new Map(events.map(event => [event._id, event])).values()
  // );
  return (
    <div>
      <div className="text-2xl text-center font-bold">All Upcoming Event</div>
      <p className="text-center">Explore event</p>

      <form className="mt-5 mb-10 flex gap-2 justify-center">
        <label className="input rounded-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn btn-secondary rounded-full bg-[#3c576e]">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {uniqueEvents.length > 0 ? (
          uniqueEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p className="col-span-full text-center">No event found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;
