export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 70,
  },
  {
    field: "position",
    headerName: "Position",
    width: 70,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 70,
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    width: 70,
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 70,
  },
  {
    field: "email",
    headerName: "Email",
    width: 70,
  },
  {
    field: "country",
    headerName: "Country",
    width: 70,
  },
  {
    field: "city",
    headerName: "City",
    width: 70,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 70,
  },
  {
    field: "status",
    headerName: "Status",
    width: 70,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];


export const programColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 70,
  },
  {
    field: "type",
    headerName: "Type",
    width: 70,
  },
  {
    field: "title",
    headerName: "Title",
    width: 70,
  },
  {
    field: "level",
    headerName: "level",
    width: 70,
  },
];

export const plansColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 70,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 70,
  },
  {
    field: "price",
    headerName: "Price",
    width: 70,
  },
  {
    field: "maxParticipant",
    headerName: "Max Participant",
    width: 70,
  },
];


export const inquiryColumns = [
  // { field: "_id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "program", headerName: "Program", width: 150 },
  { field: "subject", headerName: "Subject", width: 150 },
  { field: "text", headerName: "Text", width: 150 },
];

export const reviewColumns = [
  // { field: "_id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "subject", headerName: "Subject", width: 150 },
  { field: "photo", headerName: "Photo", width: 150 },
  { field: "rate", headerName: "Rate", width: 150 },
  { field: "text", headerName: "Text", width: 150 },
];


export const clientColumns = [
  { field: "Name", headerName: "Name", width: 150 },
  { field: "Country", headerName: "Country", width: 150 },
  { field: "Phone", headerName: "Phone", width: 150 },
  { field: "Age", headerName: "Age", width: 150 },
  { field: "notes", headerName: "Notes", width: 150 },
  { field: "participants", headerName: "Participants", width: 150 },
  { field: "Price", headerName: "Price", width: 150 },
  { field: "startingDate", headerName: "Starting Date", width: 150 },
  { field: "endDate", headerName: "End Date", width: 150 },
  { field: "ClientTID", headerName: "Client Tracking ID", width: 150 },
  { field: "RIF", headerName: "Registration Identification Number", width: 200 },
  { field: "Payment", headerName: "Payment", width: 150 },
  { field: "Status", headerName: "Status", width: 150 },
  { field: "date", headerName: "Date", width: 150 },
];

