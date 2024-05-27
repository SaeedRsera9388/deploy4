import React from 'react';
import moment from 'moment';

const FinalConfirmation = ({ user, plans, selectedSeats, dateRange }) => {
  if (!plans || plans.length === 0) {
    return <div>No plans selected</div>;
  }

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2 - date1);
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  // Ensure dateRange is not undefined
  if (!dateRange || dateRange.length !== 2) {
    return <div>Error: Invalid date range</div>;
  }

  const startDate = moment(dateRange[0]);
  const endDate = moment(dateRange[1]);

  const daysDifference = dayDifference(startDate, endDate);

  const totalPrice = plans.reduce((acc, plan) => {
    const { price } = plan;
    return acc + daysDifference * price;
  }, 0);

  const handleConfirm = () => {
    // Handle confirmation logic
  };

  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {user._id}</p>
      <p>User Name: {user.firstName} {user.lastName}</p>
      <p>User Customer ID: {user.customerID}</p>

      <h2>Plans Selected</h2>
      {plans.map((plan) => (
        <div key={plan._id}>
          <h3>{plan.title}</h3>
          <p>Description: {plan.desc}</p>
          <p>Price: ${plan.price}</p>
        </div>
      ))}

      <h2>Selected Seats</h2>
      {selectedSeats.map((seat) => (
        <div key={seat._id}>
          <p>Seat Number: {seat.number}</p>
        </div>
      ))}

      <h2>Date Range</h2>
      <p>Start Date: {startDate.format("DD/MM/YYYY")}</p>
      <p>End Date: {endDate.format("DD/MM/YYYY")}</p>

      <h2>Total Amount</h2>
      <p>${totalPrice}</p>

      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default FinalConfirmation;
