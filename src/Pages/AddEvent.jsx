import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../contex/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddEvent = () => {
  const { user } = use(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.location.trim())
      newErrors.location = "Location is required.";

    // Thumbnail validation
    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = "Thumbnail URL is required.";
    }
    //  else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.thumbnail)) {
    //   newErrors.thumbnail = "Please enter a valid image URL (jpg, png, webp, gif).";
    // }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(startDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.event_date = "Cannot select a past date.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      location: e.target.location.value,
      join: 0,
      event_date: startDate,
      created_at: new Date(),
      created_by: user.email,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix form errors before submitting.");
      return;
    }

    // If no errors, clear previous ones
    setErrors({});

    axiosSecure
      .post("/events", formData)
      .then((response) => {
        const result = response.data || response;
        const formattedDate = startDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        toast.success(
          `Event scheduled for ${formattedDate} has been added successfully!`
        );
        e.target.reset();
        setStartDate(new Date());
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        let errorMessage = "Failed to create event. Please try again.";
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      });
  };

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full rounded-full focus:outline-gray-200"
              placeholder="Enter event name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              name="category"
              defaultValue=""
              className="select w-full rounded-full focus:outline-gray-200"
            >
              <option value="" disabled>Select category</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation">Donation</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              rows="3"
              className="textarea w-full rounded-2xl focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              className="input w-full rounded-full focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              className="input w-full rounded-full focus:outline-gray-200"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Event Date */}
          <div>
            <label className="label font-medium">Event Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
              className="input w-full rounded-full focus:outline-gray-200 m-2"
              placeholderText="Select event date"
              name="event_date"
              showPopperArrow={false}
              popperPlacement="bottom"
            />
            {errors.event_date && (
              <p className="text-red-500 text-sm">{errors.event_date}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Only future dates are allowed
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-[#b83d46]"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
