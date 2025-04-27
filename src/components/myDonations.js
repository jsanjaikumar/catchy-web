import React, { useEffect, useState } from "react";
import { GET_DONATIONS_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import "../styles/volunteer.css";
import Loader from "./loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyDonations = () => {
  const [MyDonationsData, setMyDonationsData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); // For popup
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token) navigate("/");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(GET_DONATIONS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const foods = await res.json();
      setMyDonationsData(foods);
    } catch (error) {
      console.error("Error fetching MyDonations data:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        {MyDonationsData?.length > 0 ? (
          MyDonationsData?.map((val, key) => {
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
                    Name:&nbsp;<strong>{val?.firstName}</strong>
                  </p>
                  <p>
                    Email:&nbsp;<strong>{val?.email}</strong>
                  </p>
                  <p>
                    Address:&nbsp;<strong>{val?.address}</strong>
                  </p>
                  <p>
                    Contact:&nbsp;<strong>{val?.phone}</strong>
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
                </div>
              </div>
            );
          })
        ) : (
          <p className='d-flex-full' style={{ textAlign: "center" }}>
            No Data Available
          </p>
        )}

        {showModal && selectedData && (
          <div className='modal-overlay d-flex-col'>
            <div className='modal-content'>
              <div className='d-flex'>
                <div style={{ flex: 1, padding: "20px" }}>
                  <h2>Assignment Details</h2>
                  <p>
                    <strong>Title:</strong> {selectedData?.title}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedData?.firstName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedData?.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedData?.address}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedData?.phone}
                  </p>
                  <p>
                    <strong>Servings:</strong> {selectedData?.servings}
                  </p>
                  <p>
                    <strong>Assigned At:</strong>{" "}
                    {new Date(selectedData?.expiryDate).toLocaleString()}
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

export default MyDonations;
