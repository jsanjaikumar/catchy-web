import React, { useEffect, useState } from "react";
import "../styles/jobs.css";
import {
  GET_FOOD_LISTINGS_URL,
  POST_FOOD_REQUEST_URL,
} from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoaderPopup from "./loader";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const FoodListings = () => {
  const navigate = useNavigate();

  const token = Cookies.get("token");
  if (!token) navigate("/");

  const [foodListingData, setFoodListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    servings: "",
  });

  const fetchFoodListing = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${GET_FOOD_LISTINGS_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFoodListingData(data);
    } catch (error) {
      console.error("Error fetching food listings:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    fetchFoodListing();
  }, []);

  const handleRequestClick = (food) => {
    setSelectedFood(food);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      name: "",
      address: "",
      contact: "",
      email: "",
      servings: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const data = {
      foodId: selectedFood?._id,
      ...formData,
    };

    try {
      const response = await fetch(POST_FOOD_REQUEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const result = await response.json();
      const notify = () => toast.success("Request successful!");
      notify();

      handleCloseModal();
      fetchFoodListing();
    } catch (error) {
      const notify = () => toast.error(`${error}`);
      notify();
      console.error("Error submitting request:", error);
    }
  };

  return (
    <>
      <ToastContainer />

      {isLoading && <LoaderPopup open={isLoading} />}
      <div className='jobs-main-container d-flex gap-16'>
        {foodListingData.map((val, key) => {
          return (
            <div
              className='jobs-container d-flex-col d-flex-jsb gap-8'
              key={key}
            >
              <div className='d-flex-col gap-8'>
                <p>
                  Title:&nbsp;<strong>{val?.title}</strong>
                </p>
                <p>
                  Food type:&nbsp;<strong>{val?.foodType}</strong>
                </p>
                <p>
                  Donor:&nbsp;<strong>{val?.firstName}</strong>
                </p>
                <p>
                  Donor email:&nbsp;<strong>{val?.email}</strong>
                </p>
                <p>
                  Donor address:&nbsp;<strong>{val?.address}</strong>
                </p>
                <p>
                  Expiry date:&nbsp;<strong>{val?.expiryDate}</strong>
                </p>
                <p>
                  Contact:&nbsp;<strong>{val?.phone}</strong>
                </p>
                <p>
                  ZipCode:&nbsp;<strong>{val?.zip}</strong>
                </p>
                <p>
                  Available Servings:&nbsp;
                  <strong>{val?.availableServings}</strong>
                </p>
              </div>

              <button onClick={() => handleRequestClick(val)}>Request</button>
            </div>
          );
        })}
      </div>

      {/* MUI Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h6' mb={2}>
            Request Food
          </Typography>

          <TextField
            fullWidth
            label='Your Name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Your Address'
            name='address'
            value={formData.address}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Your Contact'
            name='contact'
            value={formData.contact}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Your Email'
            name='email'
            value={formData.email || ""}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Servings Needed'
            name='servings'
            value={formData.servings}
            onChange={handleInputChange}
            margin='normal'
            type='number'
          />

          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleSubmit()}
          >
            Submit Request
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FoodListings;
