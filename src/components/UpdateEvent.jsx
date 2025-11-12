import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router";

const UpdateEvent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/upcoming-events-details/${id}`)
      .then((res) => {
        console.log("Fetched event:", res.data);
        const event = res.data.result;
        setEventData(event);

        if (event.event_date) {
          setStartDate(new Date(event.event_date));
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading event:", err);
        toast.error("Failed to load event");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(startDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Cannot update event with a past date.");
      return;
    }

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      location: e.target.location.value,
      event_date: startDate,
      updated_at: new Date(),
      updated_by: user.email,
    };

    axiosSecure
      .put(`/events/${id}`, formData)
      .then((res) => {
        toast.success("Event updated successfully!");
        navigate("/myCreatedEvent"); 
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("Failed to update event.");
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading event data...</p>;
  }

  if (!eventData) {
    return <p className="text-center mt-10">No event found.</p>;
  }

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Update Event</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={eventData.name}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              defaultValue={eventData.category}
              required
              className="select w-full rounded-full focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={eventData.description}
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:outline-gray-200"
            ></textarea>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={eventData.thumbnail}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          {/* Location */}
          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={eventData.location}
              required
              className="input w-full rounded-full focus:outline-gray-200"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="label font-medium">Event Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
              className="input w-full rounded-full focus:outline-gray-200"
              placeholderText="Select event date"
              required
              showPopperArrow={false}
              popperPlacement="bottom"
            />
            <p className="text-xs text-gray-500 mt-1">
              Only future dates are allowed
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-[#b83d46]"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
