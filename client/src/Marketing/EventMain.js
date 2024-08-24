import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Row, Col, Tag } from "antd";
import EventForm from "./EventForm"; // Import the EventForm component
import Eventpic1 from "../Images/event1.jpg";
import Eventpic2 from "../Images/event2.jpg";
import Eventpic3 from "../Images/event3.jpg";
import Eventpic4 from "../Images/event3.jpg"; // Add your new images here
import Eventpic5 from "../Images/event3.jpg";
import Eventpic6 from "../Images/event3.jpg";
import NavbarImage from "../Images/evenmain1.png"; // Add your image path here

const { Meta } = Card;

const eventDetails = [
  {
    id: 1,
    image: Eventpic1,
    type: "Physical",
    title: "Australia Education Exhibition",
    date: "13th Sep 2024, 10:30 AM - 2:00 PM",
    location: "Sri Lanka - Colombo",
    region: "Australia",
    levels: "Postgraduate, Undergraduate, Doc...",
  },
  {
    id: 2,
    image: Eventpic2,
    type: "Virtual",
    title: "Australia Education Exhibition",
    date: "13th Sep 2024, 10:30 AM - 2:00 PM",
    location: "Sri Lanka - Colombo",
    region: "Australia",
    levels: "Postgraduate, Undergraduate, Doc...",
  },
  {
    id: 3,
    image: Eventpic3,
    type: "Physical",
    title: "Australia Education Exhibition",
    date: "13th Sep 2024, 10:30 AM - 2:00 PM",
    location: "Sri Lanka - Colombo",
    region: "Australia",
    levels: "Postgraduate, Undergraduate, Doc...",
  },
  {
    id: 4,
    image: Eventpic4,
    type: "Virtual",
    title: "Canada Education Fair",
    date: "15th Oct 2024, 9:00 AM - 1:00 PM",
    location: "Sri Lanka - Kandy",
    region: "Canada",
    levels: "Postgraduate, Undergraduate, MBA",
  },
  {
    id: 5,
    image: Eventpic5,
    type: "Physical",
    title: "UK Education Expo",
    date: "20th Nov 2024, 11:00 AM - 4:00 PM",
    location: "Sri Lanka - Colombo",
    region: "United Kingdom",
    levels: "Undergraduate, MBA",
  },
  {
    id: 6,
    image: Eventpic6,
    type: "Virtual",
    title: "USA University Fair",
    date: "5th Dec 2024, 2:00 PM - 6:00 PM",
    location: "Sri Lanka - Jaffna",
    region: "United States",
    levels: "Postgraduate, Undergraduate, Doc...",
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-5">
      {!showForm ? (
        <>
          <div className="mb-36 relative">
            {/* Image and Events text */}
            <img src={NavbarImage} alt="Navbar" className="w-full h-80" />

            {/* Events text with underline */}
            <div className="absolute top-1/2 left-32 transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-6xl text-white font-bold">
                Events
              </h1>
            </div>

            <div className="relative">
              {/* "New Event" button */}
              <Button
                type="primary"
                className="absolute top-10 left-0 px-8 py-6 text-xl w-48"
                onClick={() => setShowForm(true)}
              >
                New Event
              </Button>

              {/* "View Participants" button with custom text and border color */}
              <Button
                type="default"
                className="absolute top-10 left-56 px-8 py-6 text-xl w-48 text-[#0F2F64] border-black"
              >
                View Participants
              </Button>

              {/* "Events Reports" button with custom text and border color */}
              <Button
                type="default"
                className="absolute top-10 right-24 px-8 py-6 text-xl w-48 text-[#0F2F64] border-black"
              >
                Events Reports
              </Button>
            </div>
          </div>

          <Row gutter={[16, 16]} justify="center">
            {eventDetails.map((event) => (
              <Col xs={24} sm={12} md={8} lg={8} key={event.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={event.title}
                      src={event.image}
                      className="rounded-t-lg"
                    />
                  }
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  <Tag
                    color={event.type === "Physical" ? "blue" : "green"}
                    className="absolute top-4 left-4 text-sm font-bold"
                  >
                    {event.type}
                  </Tag>
                  <Meta
                    title={event.title}
                    description={event.date}
                    className="text-center text-lg font-bold my-4"
                  />
                  <div className="text-center text-gray-600">
                    <p className="m-0">{event.location}</p>
                    <p className="m-0">{event.region}</p>
                    <p className="m-0">{event.levels}</p>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="mt-4 rounded-lg font-bold"
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
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
