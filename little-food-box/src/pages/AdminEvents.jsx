import { useEffect, useState } from "react";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    eventDate: "",
    isActive: true,
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Event Added Successfully");

        setFormData({
          title: "",
          description: "",
          location: "",
          image: "",
          eventDate: "",
          isActive: true,
        });

        fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Event Management
      </h1>

      {/* Add Event Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">
          Add New Event
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="border p-3 rounded w-full mt-4"
        />

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label>Active Event</label>
        </div>

        <button
          type="submit"
          className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
        >
          Add Event
        </button>
      </form>

      {/* Events List */}

      <h2 className="text-2xl font-semibold mb-4">
        Existing Events
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="border rounded-xl p-4 shadow-sm"
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}

            <h3 className="text-xl font-bold">
              {event.title}
            </h3>

            <p className="text-gray-600">
              📍 {event.location}
            </p>

            <p className="text-gray-600">
              📅{" "}
              {new Date(
                event.eventDate
              ).toLocaleDateString()}
            </p>

            <p className="mt-2">
              {event.description}
            </p>

            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded text-sm ${
                  event.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {event.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <button
              onClick={() =>
                deleteEvent(event._id)
              }
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}