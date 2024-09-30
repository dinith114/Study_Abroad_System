import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import { useNavigate } from "react-router-dom";
import NavbarImage from "../Images/evenmain1.png";
import axios from "axios";
import { Card, Button, Row, Col, Tag } from "antd";
import EventForm from "./EventForm"; // Import the EventForm component
import Eventpic1 from "../Images/event1.jpg";
import Eventpic2 from "../Images/event2.jpg";
import Eventpic3 from "../Images/event3.jpg";
import Eventpic4 from "../Images/event3.jpg"; // Add your new images here
import Eventpic5 from "../Images/event3.jpg";
import Eventpic6 from "../Images/event3.jpg";

// Add your image path here

const { Meta } = Card;

const EventMain = () => {
  // const navigate = useNavigate();
  const adminStatus = localStorage.getItem("isAdmin");
  const [showForm, setShowForm] = useState(false);
  

  const [eventCards, setEventCards] = useState([]);

  useEffect(() => {
    viewEvents();
  }, []);

  const viewEvents = async () => {
    let response = await axios.get(`http://localhost:5000/event/viewEvent`);
    console.log("response", response.data);
    setEventCards(response.data);
    console.log("eventCards.coverImage", eventCards.coverImage);
    console.log("eventCards", eventCards);
  };

  const handleNavigate = (id) => {
    console.log("id", id);
    // navigate(`/EventForm-edit?id=${id}`);
     window.location.href = `/EventForm-edit?id=${id}`;
  };

  return (
    <div className="p-5">
      {!showForm ? (
        <>
          <div className="mb-36 relative">
            {/* Image and Events text */}
            <img src={NavbarImage} alt="Navbar" className="w-full h-80" />

            {/* Events text with underline */}
            <div className="absolute top-1/2 left-32 transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-6xl text-white font-bold">Events</h1>
            </div>

            {adminStatus ?  <div className="relative">
              <>
                <Button
                  type="primary"
                  className="absolute top-10 left-0 px-8 py-6 text-xl w-48"
                  onClick={() => setShowForm(true)}
                >
                  New Event
                </Button>

                <Button
                  type="default"
                  className="absolute top-10 left-56 px-8 py-6 text-xl w-48 text-[#0F2F64] border-black"
                  onClick={() => (window.location.href = "/participantList")}
                >
                  View Participants
                </Button>
              </>

            </div> : "" }
           
          </div>

          <Row gutter={[16, 16]} justify="center">
            {eventCards.map((event) => (
              <Col xs={24} sm={12} md={8} lg={8} key={event._id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={event.eventName}
                      src={event.coverImage}
                      className="rounded-t-lg"
                      onClick={() => adminStatus ? handleNavigate(event._id) : ""}
                    />
                  }
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  <Tag
                    color={event.eventType === "Physical" ? "blue" : "green"}
                    className="absolute top-4 left-4 text-sm font-bold"
                  >
                    {event.eventType}
                  </Tag>
                  <Meta
                    title={event.eventName}
                    description={event.eventDate + event.eventTime}
                    className="text-center text-lg font-bold my-4"
                  />
                  <div className="text-center text-gray-600">
                    <p className="m-0">{event.location}</p>
                    <p className="m-0">{event.country}</p>
                    <p className="m-0">{event.studyLevel}</p>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="mt-4 rounded-lg font-bold"
                    onClick={() =>
                      (window.location.href = `/eventRegister?id=${event._id}`)
                    }
                  >
                    View and Register
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <EventForm />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<EventMain />);

export default EventMain;
