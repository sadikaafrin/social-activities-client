import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contex/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router";

const UpcomingEventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const [refetch, setRefecth] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const location = useLocation();
  const form = location.state || "/";

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://social-activities-server.vercel.app/upcoming-events-details/${id}`
        );
        const data = await res.json();
        setEvent(data.result);

        if (user?.email) {
          const joinRes = await fetch(
            `https://social-activities-server.vercel.app/check-joined?eventId=${id}&email=${user.email}`
          );
          const joinData = await joinRes.json();
          setHasJoined(joinData.joined); // true or false
        } else {
          setHasJoined(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [user, id, refetch]);

  const handleJoinEvent = () => {
    if (!user) {
      toast.info("Please login to join this event!");
      // navigate("/auth/login");
      navigate("/auth/login", { state: location.pathname });
      return;
    }

    if (!event) {
      toast.error("Event data is not available. Please try again.");
      return;
    }

    if (hasJoined) {
      toast.error("You have already joined this event!");
      return;
    }

    const finalEvent = {
      name: event.name,
      join: event.join,
      created_by: event.created_by,
      description: event.description,
      thumbnail: event.thumbnail,
      created_at: new Date(),
      joined_by: user.email,
    };

    fetch(`https://social-activities-server.vercel.app/join-event/${event._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(user.accessToken && {
          authorization: `Bearer ${user.accessToken}`,
        }),
      },
      body: JSON.stringify(finalEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully joined!");
        setRefecth(!refetch);
        setHasJoined(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to join event. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="text-center py-10">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Safe check before rendering event details
  if (!event) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600">Event Not Found</h2>
          <p className="text-gray-600 mt-2">
            The event you're looking for doesn't exist or failed to load.
          </p>
          <button
            onClick={() => navigate("/upcoming-events")}
            className="btn btn-primary mt-4"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // Safe rendering with optional chaining as extra protection
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={event?.thumbnail || "/default-image.jpg"}
              alt={event?.name || "Event image"}
              className="w-full object-cover rounded-xl shadow-md"
              onError={(e) => {
                e.target.src = "/default-image.jpg";
              }}
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {event?.name || "Event Name Not Available"}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {event?.category || "Uncategorized"}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {event?.description || "No description available."}
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleJoinEvent}
                className={`btn rounded-full ${
                  !user
                    ? "btn-primary"
                    : hasJoined
                    ? "btn-disabled bg-gray-400 text-white cursor-not-allowed"
                    : "btn-secondary"
                }`}
                disabled={hasJoined}
              >
                {hasJoined ? "Already Joined" : "Join Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventDetails;
