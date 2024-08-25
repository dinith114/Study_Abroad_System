import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Row, Col, Tag, Drawer } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import EventForm from "./EventForm";
import Eventpic1 from "../Images/event1.jpg";
import Eventpic2 from "../Images/event2.jpg";
import Eventpic3 from "../Images/event3.jpg";
import Eventpic4 from "../Images/event3.jpg";
import Eventpic5 from "../Images/event3.jpg";
import Eventpic6 from "../Images/event3.jpg";
import NavbarImage from "../Images/evenmain1.png";

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
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <div className="p-5">
      <Drawer
        title="Filter Events By"
        placement="left"
        onClose={closeDrawer}
        visible={visible}
        width={400} // Adjust the width as necessary
      >
        {/* Filter form content based on your image */}
        <div className="flex flex-col space-y-4">
          <div>
            <h2>Study Destinations</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input type="checkbox" id="australia" />
                <label htmlFor="australia"> Australia</label>
              </div>
              <div>
                <input type="checkbox" id="uk" />
                <label htmlFor="uk"> United Kingdom</label>
              </div>
              <div>
                <input type="checkbox" id="nz" />
                <label htmlFor="nz"> New Zealand</label>
              </div>
              <div>
                <input type="checkbox" id="ireland" />
                <label htmlFor="ireland"> Ireland</label>
              </div>
              <div>
                <input type="checkbox" id="canada" />
                <label htmlFor="canada"> Canada</label>
              </div>
              <div>
                <input type="checkbox" id="us" />
                <label htmlFor="us"> United States</label>
              </div>
            </div>
          </div>
          <div>
            <h2>Event Type</h2>
            <select>
              <option>Select Options</option>
            </select>
          </div>
          <div>
            <h2>Event Month</h2>
            <select>
              <option>Select Options</option>
            </select>
          </div>
          <div>
            <h2>Study Level</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input type="checkbox" id="undergraduate" />
                <label htmlFor="undergraduate"> Undergraduate</label>
              </div>
              <div>
                <input type="checkbox" id="doctorate" />
                <label htmlFor="doctorate"> Doctorate</label>
              </div>
              <div>
                <input type="checkbox" id="postgraduate" />
                <label htmlFor="postgraduate"> Postgraduate</label>
              </div>
              <div>
                <input type="checkbox" id="diploma" />
                <label htmlFor="diploma"> Diploma</label>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={closeDrawer}>Clear All</Button>
            <Button type="primary">Apply Filters</Button>
          </div>
        </div>
      </Drawer>

      {!showForm ? (
        <>
          <div className="mb-36 relative">
            {/* Image and Events text */}
            <img src={NavbarImage} alt="Navbar" className="w-full h-80" />

            {/* Events text with underline */}
            <div className="absolute top-1/2 left-32 transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-6xl text-white font-bold">Events</h1>
            </div>

            <div className="relative flex items-center">
              {/* "Filter Events" button */}
              <Button
                type="primary"
                icon={<FilterOutlined />}
                className="absolute top-10 left-0 px-8 py-6 text-xl w-48"
                style={{ backgroundColor: "#2555A4", borderColor: "#2555A4" }}
                onClick={showDrawer} // Open the drawer
              >
                Filter Events
              </Button>

              {/* Upcoming Events text */}
              <h2 className="absolute top-12 left-96 text-3xl text-gray-800 font-medium">
                Upcoming Events
              </h2>
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
