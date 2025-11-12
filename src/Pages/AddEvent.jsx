import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AuthContext } from "../contex/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddEvent = () => {
  const { user } = use(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Final validation before submission - only check on submit
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const selectedDate = new Date(startDate);
//     selectedDate.setHours(0, 0, 0, 0);

//     if (selectedDate < today) {
//       toast.error(
//         "Cannot add event with a past date. Please select a future date."
//       );
//       return;
//     }

//     const formData = {
//       name: e.target.name.value,
//       category: e.target.category.value,
//       description: e.target.description.value,
//       thumbnail: e.target.thumbnail.value,
//       location: e.target.location.value,
//       event_date: startDate,
//       created_at: new Date(),
//       created_by: user.email,
//     };
//     axiosSecure
//       .post("/events", formData)
//       .then((data) => {
//         console.log("Event created successfully", data.data);
//         // Format the date for display
//         const formattedDate = startDate.toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         });
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Your work has been saved",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         console.log("Event date:", formattedDate);
//         toast.success(
//           `Event scheduled for ${formattedDate} has been added successfully!`
//         );
//         e.target.reset();
//         setStartDate(new Date());
//       })
//       .catch((error) => {
//         console.error("Error creating event:", error);
//         toast.error("Failed to create event. Please try again.");
//       });
//   };
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Date validation before submission
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const selectedDate = new Date(startDate);
  selectedDate.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    toast.error("Cannot add event with a past date. Please select a future date.");
    return;
  }

  const formData = {
    name: e.target.name.value,
    category: e.target.category.value,
    description: e.target.description.value,
    thumbnail: e.target.thumbnail.value,
    location: e.target.location.value,
    join: 0,
    event_date: startDate,
    created_at: new Date(),
    created_by: user.email
  }

  // Fixed the response handling
  axiosSecure.post("/events", formData)
    .then((response) => {
      // The response might be directly the data, or response.data depending on axios config
      const result = response.data || response;
      
      console.log("Event created successfully", result);
      
      // Format the date for display
      const formattedDate = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Event has been created successfully!",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
      
      toast.success(`Event scheduled for ${formattedDate} has been added successfully!`);
      
      // Reset form after successful submission
      e.target.reset();
      setStartDate(new Date());
      
    })
    .catch((error) => {
      console.error("Error creating event:", error);
      console.error("Error response:", error.response);
      
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
        <h2 className="text-2xl font-bold text-center mb-6">Add New Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>
          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={""}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Donation,">Donation</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>
          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* location */}
          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="label font-medium">Event Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 m-5"
              placeholderText="Select event date"
              name="event_date"
              required
              showPopperArrow={false}
              popperPlacement="bottom"
            />
            <p className="text-xs text-gray-500 mt-1">
              Only future dates are allowed
            </p>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
