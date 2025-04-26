import React, { useEffect, useState } from "react";
import { DELIVERED_URL, GET_VOLUNTEER_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import "../styles/volunteer.css";
import Loader from "./loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Volunteer = () => {
  const [volunteerData, setvolunteerData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); // For popup
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token) navigate("/");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(GET_VOLUNTEER_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const foods = await res.json();
      setvolunteerData(foods);
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelivered = async (foodId, assignmentId) => {
    try {
      const res = await fetch(DELIVERED_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ foodId, assignmentId }),
      });

      if (res.ok) {
        const notify = () => toast.success("Delivered successfully!");
        notify();
      } else {
        const notify = () => toast.error("Failed to deliver");
        notify();
      }
      fetchData();
    } catch (error) {
      const notify = () => toast("Delivery error:", error);
      notify();
      console.error("Delivery error:", error);
    }
  };

  const handleViewDetails = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  return (
    <>
      {isLoading && <Loader open={isLoading} />}
      <ToastContainer />

      <div className='jobs-main-container d-flex gap-16'>
        {volunteerData?.length > 0 ? (
          volunteerData?.map((val, key) => {
            return (
              <div
                className='jobs-container d-flex-col d-flex-jsb gap-8'
                key={key}
              >
                <div className='d-flex-col gap-8'>
                  <p>
                    Title:&nbsp;<strong>{val?.foodTitle}</strong>
                  </p>
                  <p>
                    Food type:&nbsp;<strong>{val?.foodType}</strong>
                  </p>
                  <p>
                    Recipient:&nbsp;<strong>{val?.name}</strong>
                  </p>
                  <p>
                    Recipient email:&nbsp;<strong>{val?.email}</strong>
                  </p>
                  <p>
                    Recipient address:&nbsp;<strong>{val?.address}</strong>
                  </p>
                  <p>
                    Contact:&nbsp;<strong>{val?.contact}</strong>
                  </p>
                </div>

                {/* Added Buttons */}
                <div style={{ marginTop: "10px" }}>
                  <button
                    className='view-button'
                    onClick={() => handleViewDetails(val)}
                    style={{ marginRight: "10px" }}
                  >
                    View Details
                  </button>
                  <button
                    className='delivered-button'
                    onClick={() =>
                      handleDelivered(val.foodId, val.assignmentId)
                    }
                  >
                    Delivered
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className='d-flex-full' style={{ textAlign: "center" }}>
            No Data Available
          </p>
        )}

        {/* Modal Popup */}
        {showModal && selectedData && (
          <div className='modal-overlay d-flex-col'>
            <div className='modal-content'>
              <div className='d-flex'>
                <div style={{ flex: 1, padding: "20px" }}>
                  <h2>Assignment Details</h2>
                  <p>
                    <strong>Title:</strong> {selectedData?.foodTitle}
                  </p>
                  <p>
                    <strong>Recipient:</strong> {selectedData?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedData?.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedData?.address}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedData?.contact}
                  </p>
                  <p>
                    <strong>Servings:</strong> {selectedData?.servings}
                  </p>
                  <p>
                    <strong>Assigned At:</strong>{" "}
                    {new Date(selectedData?.assignedAt).toLocaleString()}
                  </p>
                </div>

                <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
                  <img
                    src={
                      selectedData.foodType === "veg"
                        ? "https://eastindianrecipes.net/wp-content/uploads/2022/09/How-to-Make-North-Indian-Thali-Vegetarian-7.jpg"
                        : "https://i.pinimg.com/736x/20/92/48/2092483fde63dc2c9e3f2a0038c8af1f.jpg"
                    }
                    alt='Food Type'
                    style={{ maxWidth: "100%", height: "100%" }}
                  />
                </div>
              </div>

              <button onClick={closeModal} style={{ marginTop: "10px" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Volunteer;
