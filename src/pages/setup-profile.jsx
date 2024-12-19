import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const SetupProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surgeryDate: "",
    affectedLeg: "right",
    therapistName: "",
    therapistPhone: "",
    therapistEmail: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      // Get the current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw new Error(userError.message);
  
      if (!user) throw new Error("User not authenticated");
  
      // Update the user's profile in the "users" table
      const { error: dbError } = await supabase
        .from("users")
        .update({
          surgery_date: formData.surgeryDate,
          affected_leg: formData.affectedLeg,
          therapist_name: formData.therapistName,
          therapist_phone: formData.therapistPhone,
          therapist_email: formData.therapistEmail,
          notes: formData.notes,
        })
        .eq("email", user.email); // Match by email
  
      if (dbError) throw new Error(dbError.message);
  
      // Navigate to the dashboard after successful submission
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">
          Complete Your Profile
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4">{error}</p>}

        {/* Profile Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Surgery Date */}
          <div>
            <label htmlFor="surgeryDate" className="block text-gray-700 font-medium mb-1">
              Surgery Date
            </label>
            <input
              type="date"
              id="surgeryDate"
              value={formData.surgeryDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          {/* Affected Leg */}
          <div>
            <label htmlFor="affectedLeg" className="block text-gray-700 font-medium mb-1">
              Affected Leg
            </label>
            <select
              id="affectedLeg"
              value={formData.affectedLeg}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>

          {/* Therapist Information */}
          <div>
            <label htmlFor="therapistName" className="block text-gray-700 font-medium mb-1">
              Therapist Name (Optional)
            </label>
            <input
              type="text"
              id="therapistName"
              value={formData.therapistName}
              onChange={handleChange}
              placeholder="Dr. Smith"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          <div>
            <label htmlFor="therapistPhone" className="block text-gray-700 font-medium mb-1">
              Therapist Phone (Optional)
            </label>
            <input
              type="tel"
              id="therapistPhone"
              value={formData.therapistPhone}
              onChange={handleChange}
              placeholder="123-456-7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          <div>
            <label htmlFor="therapistEmail" className="block text-gray-700 font-medium mb-1">
              Therapist Email (Optional)
            </label>
            <input
              type="email"
              id="therapistEmail"
              value={formData.therapistEmail}
              onChange={handleChange}
              placeholder="therapist@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional details or notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#0D47A1]"
            } text-white font-bold py-3 rounded-md hover:bg-[#002F6C] transition duration-300`}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;
