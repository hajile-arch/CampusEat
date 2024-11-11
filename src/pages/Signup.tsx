import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FormType, CandidateKeyType } from "../types";
import supabase from "../utils/supabase";
import { createProfile, readProfile } from "../services/profile";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormType>({
    email: "",
    name: "",
    studentID: "",
    password: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const accountAlreadyExist = (users: CandidateKeyType[]) => {
    for (const user of users) {
      if (user.student_id.toUpperCase() === formData.studentID.toUpperCase()) {
        alert("Student ID already exists");
        return true;
      }
      if (user.email.toLowerCase() === formData.email.toLowerCase()) {
        alert("Email already exists");
        return true;
      }
      if (user.phone_number === formData.phoneNumber) {
        alert("Phone number already exists");
        return true;
      }
    }
    return false;
  };

  const handleSignUp = async (formData: FormType) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert("Failed to create account, please try again.");
      console.log("error signing up: ", error);
    } else {
      if (data.user && data.user.id) {
        const user_created = await createProfile(
          formData.studentID,
          data.user.id,
          formData.name,
          formData.phoneNumber,
          formData.email
        );

        if (user_created) {
          navigate("/login");
        } else {
          console.log("error: fail to create profile");
        }
      }
    }
  };

  const handleSubmit = async (formData: FormType) => {
    const users = await readProfile("student_id, email, phone_number");

    if (users) {
      if (!accountAlreadyExist(users as unknown as CandidateKeyType[])) {
        handleSignUp(formData);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-5">Come Join Us</h2>

        <input
          className="mb-4 p-2 w-full border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="mb-4 p-2 w-full border rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="mb-4 p-2 w-full border rounded"
          type="text"
          name="studentID"
          placeholder="Student ID (e.g., B1234567)"
          value={formData.studentID}
          onChange={handleChange}
          pattern="^B\d{7}$"
          title="Student ID should start with 'B' and have 7 digits."
          required
        />

        <div className="relative mb-4">
          <input
            className="p-2 w-full border rounded"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>

        <input
          className="mb-4 p-2 w-full border rounded"
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          pattern="^\d{10,11}$"
          title="Please enter a valid 10-digit phone number."
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
