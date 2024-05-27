import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import List from "./pages/List/List";
import Single from "./pages/Single/Single";
import New from "./pages/New/New";
import Ticket from "./pages/Ticket/Ticket";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { plansColumns, programColumns, userColumns } from "./DataTableSource";
import { plansInputs, programInputs, userInputs } from "./formSource";
import NewProgram from "./pages/NewProgram/NewProgram";
import NewPlans from "./pages/NewPlans/NewPlans";
import Inquiry from "./pages/Inquiry/Inquiry";
import SingleInquiry from "./pages/SingleInquiry/SingleInquiry";
import Comment from "./pages/Comment/Comment";
import Review from "./pages/Review/Review";
import SingleReview from "./pages/SingleReview/SingleReview";
import SinglePhoto from "./pages/SinglePhoto/SinglePhoto";
import Photo from "./pages/Photo/Photo";
import Client from "./pages/Client/Client";
import SingleClient from "./pages/SingleClient/SingleClient";
import SingleSubscribe from "./pages/SingleSubscribe/SingleSubscribe";
import Subscribe from "./pages/Subscribe/Subscribe";
import Youtube from "./pages/Youtube/Youtube";
import Video from "./pages/Video/Video";
import SingleTicket from "./pages/SingleTicket/SingleTicket";
import SingleComment from "./pages/SingleComment/SingleComment";
import SingleAccount from "./pages/SingleAccount/SingleAccount";
import Account from "./pages/Account/Account";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="programs">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={programColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":programId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewProgram
                      inputs={programInputs}
                      title="Add new Programs"
                    />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="plans">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={plansColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":planId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPlans inputs={plansInputs} title="Add new Plans" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="tickets">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Ticket />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleTicket />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="accounts">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleAccount />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="inquiries">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Inquiry />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleInquiry />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="comments">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Comment />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleComment />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="reviews">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Review />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleReview />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="photos">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Photo />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SinglePhoto />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="clients">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Client />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleClient />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="subscribes">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Subscribe />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <SingleSubscribe />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="youtubes">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Youtube />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="videos">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Video />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
