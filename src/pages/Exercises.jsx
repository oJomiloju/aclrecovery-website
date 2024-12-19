import React, { useState } from "react";

const Exercises = () => {
  const [completedExercises, setCompletedExercises] = useState([1, 2]); // Simulate 2 completed exercises
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = [
    {
      id: 1,
      name: "Heel Slides",
      sets: 3,
      reps: 10,
      description: "Lie on your back and slide your heel towards your buttocks.",
      difficulty: "Beginner",
      phase: "Phase 1: Initial Recovery",
    },
    {
      id: 2,
      name: "Quadriceps Sets",
      sets: 3,
      reps: 15,
      description: "Tighten your thigh muscles and hold for 5 seconds.",
      difficulty: "Beginner",
      phase: "Phase 1: Initial Recovery",
    },
    {
      id: 3,
      name: "Hamstring Curls",
      sets: 3,
      reps: 12,
      description: "Bend your knee as far as possible, then return slowly.",
      difficulty: "Intermediate",
      phase: "Phase 2: Strengthening",
    },
    {
      id: 4,
      name: "Wall Slides",
      sets: 2,
      reps: 12,
      description: "Slide your back down a wall into a sitting position.",
      difficulty: "Intermediate",
      phase: "Phase 2: Strengthening",
    },
    {
      id: 5,
      name: "Step-Ups",
      sets: 3,
      reps: 10,
      description: "Step up onto a platform, alternating legs.",
      difficulty: "Advanced",
      phase: "Phase 3: Advanced Recovery",
    },
  ];

  const toggleCompletion = (id) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter((exerciseId) => exerciseId !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const adherence = Math.round((completedExercises.length / exercises.length) * 100);

  return (
    <div>
      {/* Page Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#0D47A1" }}>
          Exercise Recommendations
        </h1>
        <p className="text-gray-700">
          Follow your prescribed exercises to stay on track with your recovery.
        </p>
      </section>

      {/* Progress Tracker */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#0D47A1" }}>
            Adherence Progress
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-[#294C3A] h-4 rounded-full"
              style={{ width: "40%" }} // Green bar at 40%
            ></div>
          </div>
          <p className="text-gray-700 mt-2">40% of exercises completed</p>
        </div>
      </section>

      {/* Exercise List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg p-4 ${
              completedExercises.includes(exercise.id) ? "opacity-70" : ""
            }`}
          >
            <h3 className="text-lg font-bold mb-2" style={{ color: "#0D47A1" }}>
              {exercise.name}
            </h3>
            <p className="text-gray-700 mb-2">
              {exercise.sets} Sets of {exercise.reps} Reps
            </p>
            <p className="text-gray-700 mb-2">Difficulty: {exercise.difficulty}</p>
            <p className="text-gray-700 mb-4">Phase: {exercise.phase}</p>
            <button
              onClick={() => toggleCompletion(exercise.id)}
              className={`px-4 py-2 rounded-lg transition ${
                completedExercises.includes(exercise.id)
                  ? "bg-gray-300 text-gray-700"
                  : "bg-[#0D47A1] text-white hover:bg-[#002F6C]"
              }`}
            >
              {completedExercises.includes(exercise.id) ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Exercises;
