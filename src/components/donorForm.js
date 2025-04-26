import React, { useState, useEffect } from "react";
import "../styles/donorForm.css";
import Cookies from "js-cookie";
import { DONATE_FOOD_URL } from "../helper/apiurls";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DonorForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    servings: "",
    expiryDate: "",
    location: "",
    zip: "",
    address: "",
    countryCode: "",
    phone: "",
    email: "",
    checkbox: false,
    latitude: "",
    longitude: "",
  });

  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token) navigate("/");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          setFormData((prev) => ({
            ...prev,
            address: data.display_name || "",
          }));
        } catch (error) {
          console.log("Reverse geocoding failed:", error);
        }
      },
      (error) => console.log("Location permission denied", error)
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${DONATE_FOOD_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const notify = () =>
          toast.success("Food donation submitted successfully");
        notify();
        setFormData({
          title: "",
          firstName: "",
          lastName: "",
          servings: "",
          expiryDate: "",
          location: "",
          zip: "",
          address: "",
          countryCode: "",
          phone: "",
          email: "",
          checkbox: false,
          latitude: "",
          longitude: "",
        });
      } else {
        const notify = () =>
          toast.error(`Failed to submit food donation: ${data.error}`);
        notify();
        console.error("Failed to submit food donation:", data.error);
      }
    } catch (error) {
      const notify = () =>
        toast.error(`Error submitting food donation: ${error}`);
      notify();
      console.error("Error submitting food donation:", error);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className='form-v10-content'>
        <form
          className='form-detail d-flex'
          onSubmit={handleSubmit}
          id='myform'
        >
          <div className='form-left'>
            <h2>Food Details</h2>
            <div className='form-row'>
              <input
                type='text'
                name='title'
                id='title'
                className='input-text'
                placeholder='Food Title'
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  className='input-text'
                  placeholder='Donor First Name'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-row form-row-2'>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  className='input-text'
                  placeholder='Donor Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <input
                type='number'
                name='servings'
                className='salary'
                id='salary'
                placeholder='Number of Servings'
                value={formData.servings}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-row'>
              <input
                type='text'
                name='foodType'
                className='expiryDate'
                id='foodType'
                placeholder='Food Type (e.g., Veg/Non-Veg)'
                value={formData.foodType}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-row d-flex-alc gap-8'>
              <label
                htmlFor='expiryDate'
                className='custom-label'
                style={{ color: "grey" }}
              >
                Expiry Date
              </label>
              <input
                type='datetime-local'
                name='expiryDate'
                className='expiryDatelocation'
                id='expiryDate'
                value={formData.expiryDate}
                onChange={handleChange}
                required
                style={{ width: "70%" }}
              />
            </div>
          </div>

          <div className='form-right'>
            <h2>Pickup & Contact Details</h2>
            <div className='form-group'>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='zip'
                  className='zip'
                  id='zip'
                  placeholder='Zip Code'
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='address'
                  className='address'
                  id='address'
                  placeholder='Pickup Address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='form-row form-row-1'>
                <input
                  type='text'
                  name='countryCode'
                  className='countryCode'
                  id='countryCode'
                  placeholder='countryCode +'
                  value={formData.countryCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-row form-row-2'>
                <input
                  type='text'
                  name='phone'
                  className='phone'
                  id='phone'
                  placeholder='Phone Number'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <input
                type='text'
                name='email'
                id='email'
                className='input-text'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleChange}
                required
                pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}'
              />
            </div>

            <input type='hidden' name='latitude' value={formData.latitude} />
            <input type='hidden' name='longitude' value={formData.longitude} />

            <div className='form-row-last'>
              <input
                type='submit'
                name='register'
                className='register'
                value='Submit Donation'
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DonorForm;
