import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi"; // Upload icon
import supabase from "../supabase";
import RecoveryGoalModal from "./RecoveryGoalModal"; // Modal for setting goals
import CalendarEventModal from "./CalendarEventModal"; // Modal for calendar events

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    rom_flexion: 0,
    rom_extension: 0,
    quad_strength_ratio: 0,
    pain_level: 0,
  });
  const [recoveryGoal, setRecoveryGoal] = useState(null); // For recovery goals
  const [calendarEvents, setCalendarEvents] = useState([]); // For calendar events
  const [showGoalModal, setShowGoalModal] = useState(false); // Modal visibility for goals
  const [showEventModal, setShowEventModal] = useState(false); // Modal visibility for events
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for editing
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Step 1: Get the current user's session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) {
          throw new Error("No authenticated user found.");
        }

        const userId = session.user.id;

        // Step 2: Fetch user profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", userId)
          .single();

        setUser(profile);

        // Step 3: Fetch the latest measurement report
        const { data: latestStats } = await supabase
          .from("measurements")
          .select("rom_flexion, rom_extension, quad_strength_ratio, pain_level, date")
          .eq("user_id", userId)
          .order("date", { ascending: false })
          .limit(1)
          .single();

        setStats(latestStats || stats);

        // Step 4: Fetch recovery goal
        const { data: goal } = await supabase
          .from("recovery_goals")
          .select("goal_description, target_date")
          .eq("user_id", userId)
          .single();

        setRecoveryGoal(goal);

        // Step 5: Fetch calendar events
        const { data: events } = await supabase
          .from("calendar_events")
          .select("id, event_name, event_date, description")
          .eq("user_id", userId)
          .order("event_date", { ascending: true });

        setCalendarEvents(events || []);
      } catch (err) {
        console.error("Dashboard error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleUploadRedirect = () => {
    navigate("/dashboard/upload");
  };

  const handleGoalSaved = async () => {
    setShowGoalModal(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) return;

      const userId = session.user.id;

      // Refresh recovery goal
      const { data: updatedGoal } = await supabase
        .from("recovery_goals")
        .select("goal_description, target_date")
        .eq("user_id", userId)
        .single();

      setRecoveryGoal(updatedGoal);
    } catch (err) {
      console.error("Error refreshing recovery goal:", err.message);
    }
  };

  const handleEventSaved = async () => {
    setShowEventModal(false);
    setSelectedEvent(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) return;

      const userId = session.user.id;

      // Refresh calendar events
      const { data: updatedEvents } = await supabase
        .from("calendar_events")
        .select("id, event_name, event_date, description")
        .eq("user_id", userId)
        .order("event_date", { ascending: true });

      setCalendarEvents(updatedEvents || []);
    } catch (err) {
      console.error("Error refreshing calendar events:", err.message);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="relative px-4 md:px-8 lg:px-16 py-8">
      {/* Upload Icon (Top-Right Corner) */}
      <div className="absolute top-4 right-4">
        <div
          className="group relative flex items-center cursor-pointer"
          onClick={handleUploadRedirect}
        >
          <FiUpload size={28} className="text-[#0D47A1] hover:text-[#002F6C] transition duration-200" />
          <span className="absolute top-8 right-0 hidden group-hover:block bg-black text-white text-sm px-3 py-1 rounded shadow-md">
            Upload Measurements
          </span>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#0D47A1]">
          Welcome back, {user?.name || "User"}!
        </h1>
        <p className="text-base md:text-lg italic text-gray-600">
          "Small progress is still progress. Keep going!"
        </p>
      </section>

      {/* Progress Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Range of Motion */}
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2 text-[#0D47A1]">Range of Motion</h3>
          <p className="text-gray-700">
            {stats.rom_flexion || 0}° Flexion / {stats.rom_extension || 0}° Extension
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-[#294C3A] h-3 rounded-full"
              style={{
                width: `${(stats.rom_flexion / 120) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Strength */}
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2 text-[#0D47A1]">Strength</h3>
          <p className="text-gray-700">
            {Math.min(stats.quad_strength_ratio || 0, 100).toFixed(0)}% of unaffected leg
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-[#294C3A] h-3 rounded-full"
              style={{
                width: `${Math.min(stats.quad_strength_ratio || 0, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Pain Level */}
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2 text-[#0D47A1]">Pain Level</h3>
          <p className="text-gray-700">{stats.pain_level || 0} / 10</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-[#FF6F61] h-3 rounded-full"
              style={{
                width: `${(stats.pain_level / 10) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Recovery Goals */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2 text-[#0D47A1]">Recovery Goals</h3>
          {recoveryGoal ? (
            <>
              <p className="text-gray-700">{recoveryGoal.goal_description}</p>
              <p className="text-gray-500 text-sm">
                Target Date: {new Date(recoveryGoal.target_date).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-gray-700">No goal set yet.</p>
          )}
          <button
            onClick={() => setShowGoalModal(true)}
            className="mt-4 px-4 py-2 bg-[#0D47A1] text-white rounded-lg hover:bg-[#002F6C] transition"
          >
            {recoveryGoal ? "Update Goal" : "Set Goal"}
          </button>
        </div>
      </section>

      {/* Calendar */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4 text-[#0D47A1]">Upcoming Calendar</h3>
          {calendarEvents.length === 0 ? (
            <p className="text-gray-500">No events added yet.</p>
          ) : (
            <ul className="space-y-4">
        {calendarEvents.slice(0, 4).map((event) => (
          <li
            key={event.id}
            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200"
          >
            <div>
              <p className="font-bold text-lg text-blue-900">{event.event_name}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.event_date).toLocaleDateString()}
              </p>
              {event.description && (
                <p className="text-sm text-gray-700 mt-1">{event.description}</p>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedEvent(event);
                setShowEventModal(true);
              }}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
          )}
          <button
            onClick={() => {
              setSelectedEvent(null);
              setShowEventModal(true);
            }}
            className="mt-4 px-4 py-2 bg-[#0D47A1] text-white rounded-lg hover:bg-[#002F6C] transition"
          >
            Add Event
          </button>
        </div>
      </section>

      {/* Modals */}
      {showGoalModal && (
        <RecoveryGoalModal
          onClose={() => setShowGoalModal(false)}
          onGoalSaved={handleGoalSaved}
          existingGoal={recoveryGoal}
        />
      )}
      {showEventModal && (
        <CalendarEventModal
          onClose={() => setShowEventModal(false)}
          onSave={handleEventSaved}
          existingEvent={selectedEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
