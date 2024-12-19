import React, { useState } from "react";
import supabase from "../supabase";

const RecoveryGoalModal = ({ onClose, onGoalSaved, existingGoal }) => {
  const [formData, setFormData] = useState({
    goal_description: existingGoal?.goal_description || "",
    target_date: existingGoal?.target_date || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGoal = async () => {
    setLoading(true);
    setError("");

    try {
      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) throw new Error("User not authenticated.");

      const userId = session.user.id;

      // Save or update the recovery goal
      const { error: dbError } = await supabase.from("recovery_goals").upsert({
        user_id: userId,
        goal_description: formData.goal_description,
        target_date: formData.target_date,
      });

      if (dbError) throw new Error(dbError.message);

      onGoalSaved(); // Notify parent to refresh the goal display
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4 text-[#0D47A1]">Set Recovery Goal</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-4">
          <textarea
            name="goal_description"
            value={formData.goal_description}
            onChange={handleChange}
            placeholder="Describe your recovery goal..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <input
            type="date"
            name="target_date"
            value={formData.target_date}
            onChange={handleChange}
            placeholder="Target Date"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </form>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveGoal}
            disabled={loading}
            className="bg-[#0D47A1] text-white px-4 py-2 rounded hover:bg-[#002F6C]"
          >
            {loading ? "Saving..." : "Save Goal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoveryGoalModal;
