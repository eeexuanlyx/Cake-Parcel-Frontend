import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useUserContext from "../../context/useUserContext";

const RequestForm = () => {
  const { user } = useUserContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

  const apiInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    data.append("title", formData.title);
    data.append("description", formData.description);

    try {
      const response = await apiInstance.post("api/form", data);

      setMessage("Form submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit form.");
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
        <>
          <h2 className="text-indigo-900 text-2xl font-bold mb-6">
            Cake Request
          </h2>
          <p className="text-gray-700 font-corinthia text-3xl">
            Customize Your Cake!
          </p>
          <p className="px-2.5">
            Make your cake as unique as you are. <br></br>Customize every
            aspect, from the size and shape to the flavors and decorations.{" "}
            <br></br>The possibilities are endless. <br></br>
            <br></br>
            <Link to="/login" className="text-blue-500 underline">
              Click here to start customizing your cake!
            </Link>
          </p>
        </>
      </div>
    );
  }

  return (
    <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
      <h2 className="text-indigo-900 text-2xl font-bold mb-6">Cake Request</h2>
      <p className="text-gray-700 font-corinthia text-3xl mb-2">
        Customize Your Cake!
      </p>
      <p>
        Fill in the form below to submit a customization request. We will
        respond to your inquiry within 3 working days.
      </p>
      <p className="mb-4">
        To ensure timely processing and delivery, we recommend submitting your
        requests at least 7 days in advance, and 2-3 weeks in advance for more
        intricate designs.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-indigo-900"
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-indigo-900"
        >
          Describe your ideas:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g. I would like a rainbow theme cake in a 6 inch size, with a fondant figurine of my friend! (attach image of friend as reference and our fondant artist would craft it!) Would love the flavour to be chocolate ganache with crunch!"
          className="border p-2 w-full"
          required
        />
        <label
          htmlFor="image"
          className="block text-sm font-medium text-indigo-900"
        >
          Upload an Image:
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />
        <p className="italic text-stone-600">
          Note: This form is for non-urgent orders only. For urgent requests,
          please contact us directly at +65 xxxx xxxx.
        </p>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
        {message && (
          <div className="text-sm text-green-500 mb-4">{message}</div>
        )}
      </form>
    </div>
  );
};

export default RequestForm;
