import React, { useState, useEffect } from "react";
import supabase from "../supabase";

const CalendarEventModal = ({ onClose, onSave, existingEvent = null }) => {
  const [eventData, setEventData] = useState({
    event_name: "",
    event_date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingEvent) {
      setEventData({
        event_name: existingEvent.event_name,
        event_date: existingEvent.event_date,
        description: existingEvent.description || "",
      });
    }
  }, [existingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) throw new Error("No authenticated user found.");

      const userId = session.user.id;

      if (existingEvent) {
        // Update event
        const { error } = await supabase
          .from("calendar_events")
          .update({
            event_name: eventData.event_name,
            event_date: eventData.event_date,
            description: eventData.description,
          })
          .eq("id", existingEvent.id)
          .eq("user_id", userId);

        if (error) throw error;
      } else {
        // Create new event
        const { error } = await supabase
          .from("calendar_events")
          .insert({
            user_id: userId,
            event_name: eventData.event_name,
            event_date: eventData.event_date,
            description: eventData.description,
          });

        if (error) throw error;
      }

      onSave(); // Refresh the events in the parent component
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingEvent) return;
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", existingEvent.id);

      if (error) throw error;

      onSave(); // Refresh the events in the parent component
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#0D47A1]">
          {existingEvent ? "Edit Event" : "Add Event"}
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Event Name</label>
            <input
              type="text"
              name="event_name"
              value={eventData.event_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Event Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Event Date</label>
            <input
              type="date"
              name="event_date"
              value={eventData.event_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Optional description"
            />
          </div>

          <div className="flex justify-between items-center">
            {existingEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg hover:bg-[#002F6C] transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarEventModal;
