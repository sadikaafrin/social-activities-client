import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import EventCard from "./EventCard";

const UpcomingEvent = () => {
  const data = useLoaderData();
  const [events, setEvents] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

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
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchText) params.append("search", searchText);
      if (category) params.append("category", category);

      const res = await fetch(
        `http://localhost:3000/search?${params.toString()}`
      );
      const data = await res.json();

      // Filter by upcoming date too
      const upcomingOnly = data.result.filter((event) => {
        const eventDate = new Date(event.event_date);
        return eventDate >= new Date();
      });

      setEvents(upcomingOnly);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl text-center font-bold">All Upcoming Event</div>
      <p className="text-center">Explore event</p>
      <form
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex flex-wrap gap-2 justify-center"
      >
        <input
          type="search"
          name="search"
          placeholder="Search by name"
          className="input input-bordered rounded-full px-4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="select select-bordered rounded-full px-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Plantation">Plantation</option>
          <option value="Animals">Animals</option>
          <option value="Characters">Characters</option>
        </select>

        <button
          type="submit"
          className="btn btn-secondary rounded-full bg-[#3c576e]"
        >
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
