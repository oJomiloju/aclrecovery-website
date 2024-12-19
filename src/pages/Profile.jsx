import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import editIcon from "../assets/images/edit.png"; // Import the edit icon

const Profile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [userDetails, setUserDetails] = useState(null); // User details from the database
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState(""); // Success/Error messages

  // Fetch the logged-in user's session and profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Get the authenticated user's session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) {
          // Redirect to login if no session
          navigate("/login");
          return;
        }

        // Fetch user details from the 'users' table
        const { data: profile, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id) // Fetch by `id`
          .single();

        if (error && error.code !== "PGRST116") {
          // Handle unexpected errors
          console.error("Error fetching user profile:", error.message);
        }

        setUserDetails(
          profile || {
            id: session.user.id,
            email: session.user.email,
            name: "",
            phone: "",
            surgeryDate: "",
            affectedLeg: "",
            notes: "",
          }
        );
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile details
  const saveDetails = async () => {
    setLoading(true);
    setMessage("");

    const userData = {
      id: userDetails.id, // Use `id` as the unique identifier
      email: userDetails.email, // Ensure email stays accurate
      name: userDetails.name || null,
      phone: userDetails.phone || null,
      surgery_date: userDetails.surgeryDate || null,
      affected_leg: userDetails.affectedLeg || null,
      notes: userDetails.notes || null,
    };

    console.log("Data to be upserted:", userData);

    try {
      const { data, error } = await supabase.from("users").upsert(userData, {
        onConflict: "id", // Specify `id` as the conflict target
      });

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      console.log("Upsert response:", data);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err.message);
      setMessage("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      {/* Profile Header */}
      <section className="mb-8 text-center">
        <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
        <h1 className="text-3xl font-bold" style={{ color: "#0D47A1" }}>
          {userDetails?.name || "Complete Your Profile"}
        </h1>
        <p className="text-gray-700">ACL Recovery Journey</p>
      </section>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-center mb-4 p-2 rounded-md ${
            message.includes("successfully")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* Personal Information Section */}
      <section className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold" style={{ color: "#0D47A1" }}>
            Personal Information
          </h2>
          <img
            src={editIcon}
            alt="Edit"
            onClick={() => setIsEditing((prev) => !prev)}
            className="w-5 h-5 cursor-pointer"
            title={isEditing ? "Save Changes" : "Edit Information"}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p>{userDetails.name || "Not Provided"}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Email</label>
            <p>{userDetails.email}</p> {/* Email is not editable */}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p>{userDetails.phone || "Not Provided"}</p>
            )}
          </div>
        </div>
      </section>

      {/* Medical Details Section */}
      <section className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D47A1" }}>
          Medical Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Surgery Date</label>
            {isEditing ? (
              <input
                type="date"
                name="surgeryDate"
                value={userDetails.surgeryDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p>{userDetails.surgeryDate || "Not Provided"}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Affected Leg</label>
            {isEditing ? (
              <select
                name="affectedLeg"
                value={userDetails.affectedLeg}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </select>
            ) : (
              <p>{userDetails.affectedLeg || "Not Provided"}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Notes</label>
            {isEditing ? (
              <textarea
                name="notes"
                value={userDetails.notes}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p>{userDetails.notes || "Not Provided"}</p>
            )}
          </div>
        </div>
      </section>

      {/* Save Button */}
      {isEditing && (
        <button
          onClick={saveDetails}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default Profile;
