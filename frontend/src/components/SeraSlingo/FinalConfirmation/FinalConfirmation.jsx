import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const FinalConfirmation = ({ setOpen, programDetails, planDetails, seatOptions, user, options, amount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoading(false); // Since we're not fetching anything here, we set isLoading to false
  }, []);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-UK", options);
  };

  const handleConfirmFinal = async () => {
    try {
      const ticketData = {
        program: programDetails._id,
        plan: planDetails._id,
        seatNumber: seatOptions.map(seat => seat.number),
        unavailableDates: seatOptions.flatMap(seat => seat.unavailableDates),
        options: JSON.stringify(options),
        amount: amount,
        trackingID: "2401290010" // Hardcoded trackingID, replace with dynamic generation if needed
      };

      const response = await axios.post(`/tickets/${user._id}/tickets`, ticketData);

      console.log("Ticket created:", response.data);

      setModalMessage("Confirmation for this reservation sent successfully");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setOpen(false); // Close the modal after successful confirmation
      }, 2000);
    } catch (error) {
      console.error("Error creating ticket:", error);
      setModalMessage("Failed to confirm reservation. Please try again.");
      setShowModal(true);
    }
  };

  return (
    <Modal show={true} onHide={() => setOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Final Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Final Confirmation</h1>
        <p>Please find the information below and confirm:</p>
        {/* Display all necessary data */}
        <div>
          <h2>Program Selected:</h2>
          <p>Program Title: {programDetails.title}</p>
          <p>Level: {programDetails.level}</p>
          <p>Description: {programDetails.desc}</p>
          <p>Max Participants: {programDetails.participant}</p>
        </div>
        <div>
          <h2>Plan Selected:</h2>
          <p>Plan Title: {planDetails.title}</p>
          <p>Description: {planDetails.desc}</p>
        </div>
        <div>
          <h2>Select Seats:</h2>
          <div className="seat-options">
            {seatOptions.map((seat) => (
              <div key={seat._id}>
                <h1>{seat.number}</h1>
                <p>
                  Selected Dates:{" "}
                  {seat.unavailableDates
                    .map((date) => formatDate(date))
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>User Data:</h2>
          {user && (
            <>
              <p>First Name : {user.firstName}</p>
              <p>Last Name : {user.lastName}</p>
              <p>Customer ID : {user.customerID}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phone}</p>
            </>
          )}
        </div>
        <div>
          <h2>Options Selected:</h2>
          {options.group !== undefined && options.group > 0 && <p>Group: {options.group}</p>}
          {options.adult !== undefined && options.adult > 0 && <p>Adult: {options.adult}</p>}
          {options.children !== undefined && options.children > 0 && <p>Children: {options.children}</p>}
          {/* Add other options as needed */}
        </div>
        <div>
          <h2>Total Amount:</h2>
          <p>Amount: ${amount}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmFinal}>
          Confirm Final
        </Button>
      </Modal.Footer>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};

export default FinalConfirmation;
