import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const UploadReports = () => {
  const [manualEntry, setManualEntry] = useState({
    rom_flexion: "",
    rom_extension: "",
    quad_strength_ratio: "",
    pain_level: "",
    swelling_circumference_cm: "",
    single_leg_balance_seconds: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setManualEntry({ ...manualEntry, [name]: value });
  };

  // Handle upload to Supabase
  const handleUpload = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Get the authenticated user
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.user) throw new Error("No authenticated user found.");

      const userId = session.user.id;

      // Insert data into the measurements table
      const { error: insertError } = await supabase
        .from("measurements")
        .insert([
          {
            user_id: userId,
            rom_flexion: manualEntry.rom_flexion,
            rom_extension: manualEntry.rom_extension,
            quad_strength_ratio: manualEntry.quad_strength_ratio,
            pain_level: manualEntry.pain_level,
            swelling_circumference_cm: manualEntry.swelling_circumference_cm,
            single_leg_balance_seconds: manualEntry.single_leg_balance_seconds,
            date: manualEntry.date,
          },
        ]);

      if (insertError) throw insertError;

      // Success Feedback
      setSuccess(true);
      setManualEntry({
        rom_flexion: "",
        rom_extension: "",
        quad_strength_ratio: "",
        pain_level: "",
        swelling_circumference_cm: "",
        single_leg_balance_seconds: "",
        date: new Date().toISOString().split("T")[0],
      });
      alert("Report uploaded successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Error uploading data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-[#0D47A1]">Log Recovery Metrics</h1>
        <p className="text-gray-700">
          Fill in the details below to manually log your recovery progress.
        </p>
      </section>

      {/* Error Message */}
      {error && <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-600 bg-green-100 p-2 rounded-md mb-4">Report saved successfully!</p>}

      {/* Manual Entry Form */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          {/* ROM Flexion */}
          <div>
            <label className="block font-medium text-gray-700">ROM Flexion (°)</label>
            <input
              type="number"
              name="rom_flexion"
              value={manualEntry.rom_flexion}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 120"
            />
          </div>

          {/* ROM Extension */}
          <div>
            <label className="block font-medium text-gray-700">ROM Extension (°)</label>
            <input
              type="number"
              name="rom_extension"
              value={manualEntry.rom_extension}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 10"
            />
          </div>

          {/* Quad Strength Ratio */}
          <div>
            <label className="block font-medium text-gray-700">Quad Strength Ratio (%)</label>
            <input
              type="number"
              name="quad_strength_ratio"
              value={manualEntry.quad_strength_ratio}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 75"
            />
          </div>

          {/* Pain Level */}
          <div>
            <label className="block font-medium text-gray-700">Pain Level (1-10)</label>
            <input
              type="number"
              name="pain_level"
              value={manualEntry.pain_level}
              onChange={handleChange}
              min="0"
              max="10"
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 2"
            />
          </div>

          {/* Swelling Circumference */}
          <div>
            <label className="block font-medium text-gray-700">Swelling Circumference (cm)</label>
            <input
              type="number"
              name="swelling_circumference_cm"
              value={manualEntry.swelling_circumference_cm}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 35.5"
            />
          </div>

          {/* Single Leg Balance */}
          <div>
            <label className="block font-medium text-gray-700">Single Leg Balance (seconds)</label>
            <input
              type="number"
              name="single_leg_balance_seconds"
              value={manualEntry.single_leg_balance_seconds}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="e.g., 30"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={manualEntry.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-4 py-2 bg-[#0D47A1] text-white rounded-lg hover:bg-[#002F6C] transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Report"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default UploadReports;
