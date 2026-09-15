import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const initialForm = {
  fullName: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    setErrors({});
    setSuccess(true);
    setForm(initialForm);
  };

  return (
    <DashboardLayout>
      <h2 className="mb-4 text-2xl font-bold text-gray-700">Contact us</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl rounded bg-white p-6 shadow"
        noValidate
      >
        <label className="mb-1 block font-medium">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="mb-1 w-full rounded border p-3"
        />
        {errors.fullName && (
          <p className="mb-3 text-sm text-red-500">{errors.fullName}</p>
        )}

        <label className="mb-1 block font-medium">Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mb-1 w-full rounded border p-3"
        />
        {errors.email && (
          <p className="mb-3 text-sm text-red-500">{errors.email}</p>
        )}

        <label className="mb-1 block font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="5"
          className="mb-1 w-full rounded border p-3"
        />
        {errors.message && (
          <p className="mb-3 text-sm text-red-500">{errors.message}</p>
        )}

        <button
          type="submit"
          className="mt-4 rounded bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          Send Message
        </button>

        {success && (
          <p className="mt-4 text-green-600">
            Your message was sent successfully.
          </p>
        )}
      </form>
    </DashboardLayout>
  );
};