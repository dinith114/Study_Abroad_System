import React, { useState } from 'react';
import './ViewPartnerships.css';
import Modal from './Modal';

// Importing necessary assets
import universityLogo from '../Images/Cambridge.png';
import universityLogo2 from '../Images/melbourne.png';
import universityLogo3 from '../Images/Auckland.png';
import { Link } from 'react-router-dom';

function ViewPartnerships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({ title: '', description: '' });
  const [expandedCards, setExpandedCards] = useState({});

  const openModal = (title, description) => {
    setModalDetails({ title, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowMore = (cardId) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId]
    }));
  };

  return (
    <div className="container">
      <div class="page-container">
      <h1 className="search-title">SEARCH PROGRAMS</h1>
  <div class="container">
    {/* Filter Panel */}
    <div className="filter-panel">
        <h3>Filter</h3>
        <div className="filter-group">
          <label>Search by Program Title</label>
          <input type="text" placeholder="Search by Program Title" />
        </div>

        <div className="filter-group">
          <label>Filter By:</label>
          <div className="radio-group">
            <label><input type="radio" name="filterType" /> Public</label>
            <label><input type="radio" name="filterType" /> Private</label>
            <label><input type="radio" name="filterType" /> Online</label>
          </div>
        </div>

        <div className="filter-group">
          <label>Level Of Interest</label>
          <select>
            <option>Select Level Of Interest</option>
            <option>Masters/PG Degree</option>
            <option>Bachelors/UG Degree</option>
            <option>Doctoral Degree PhD</option>
            <option>Internships</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Area of Specialization</label>
          <select>
            <option>Select Area of Specialization</option>
            <option>Accounting</option>
            <option>Biology</option>
            <option>Information Technology IT</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Select Country</label>
          <select>
            <option>Select Country</option>
            <option value="uk">United Kingdom</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="filter-actions">
          <Link to={'/course-details'}>
          <button className="apply-filter">Apply Filter</button>
          </Link>
          <button className="reset-filter">Reset Filter</button>
        </div>
      </div>

      {/* Program Cards */}
      <div className="program-cards">
        {/* Program Card 1 */}
        <div className="program-card">
          <div className="header">
            <img src={universityLogo} alt="University Logo" className="university-logo" />
            <div className="header-details">
              <h2>University of Cambridge</h2>
              <p>England, United Kingdom</p>
              <div className="location-info">
                <span>National Ranking: 1</span>
              </div>
            </div>
          </div>
          <div className="info-grid">
            <div>
              <h4>Founded in</h4>
              <p>1209</p>
            </div>
            <div>
              <h4>Institution Type</h4>
              <p>Public</p>
            </div>
            <div>
              <h4>Times Higher Ranking</h4>
              <p>6</p>
            </div>
          </div>
          <div className="program-details">
            <h3>Advanced Diploma in Technology, Religion, and Philosophy of Religion</h3>
            <div className="details-grid">
              <div>
                <p>Length</p>
                <p>09 Months</p>
              </div>
              <div>
                <p>Tuition Fee</p>
                <p>26208 GBP / Year</p>
              </div>
              <div>
                <p>Intake</p>
                <p>October</p>
              </div>
            </div>
            <button 
                  className="view-details" 
                  onClick={() => openModal(
                    'Advanced Diploma in Technology', 
                    'Detailed description of the Advanced Diploma in Technology, Religion, and Philosophy of Religion.',
                  )}
                >
                  View Details
              </button>
           
          </div>
          
          {expandedCards[1] && (
            <>
              <div className="program-details">
                <h3>CPGS in Theology and Religious Studies</h3>
                <div className="details-grid">
                  <div>
                    <p>Length</p>
                    <p>09 Months</p>
                  </div>
                  <div>
                    <p>Tuition Fee</p>
                    <p>25758 GBP / Year</p>
                  </div>
                  <div>
                    <p>Intake</p>
                    <p>October</p>
                  </div>
                </div>
                <button 
                  className="view-details" 
                  onClick={() => openModal(
                    'CPGS in Theology and Religious Studies', 
                    'Cambridge University`s Faculty of Divinity offers CPGS in Theology and Religious Studies Certificate program. The 9 months course of CPGS in Theology and Religious Studies is offered by the Cambridge University. To pursue Certificate CPGS in Theology and Religious Studies fees for international students is Pound 25758.0. The Cambridge University CPGS in Theology and Religious Studies requirement for international students is IELTS. Graduation cutoff for admission is 70.0%. .',
                  )}
                >
                  View Details
              </button>
              </div>
              <div className="program-details">
                <h3>PhD in Zoology</h3>
                <div className="details-grid">
                  <div>
                    <p>Length</p>
                    <p>03 Year</p>
                  </div>
                  <div>
                    <p>Tuition Fee</p>
                    <p>32352  GBP / Year</p>
                  </div>
                  <div>
                    <p>Intake</p>
                    <p>October</p>
                  </div>
                </div>
                <button className="view-details" onClick={() => openModal('Advanced Diploma in Technology', 'Detailed description of the Advanced Diploma in Technology, Religion, and Philosophy of Religion.')}>View Details</button>
              </div>
            </>
          )}
          
          <button className="show-more" onClick={() => toggleShowMore(1)}>
            {expandedCards[1] ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* Program Card 2 */}
        <div className="program-card2">
          <div className="header">
            <img src={universityLogo2} alt="University Logo" className="university-logo" />
            <div className="header-details">
              <h2>University of Melbourne</h2>
              <p>Melbourne, Victoria, Australia</p>
              <div className="location-info">
                <span>National Ranking: 1</span>
              </div>
            </div>
          </div>
          <div className="info-grid">
            <div>
              <h4>Founded in</h4>
              <p>1853</p>
            </div>
            <div>
              <h4>Institution Type</h4>
              <p>Public</p>
            </div>
            <div>
              <h4>Times Higher Ranking</h4>
              <p>34</p>
            </div>
          </div>
          <div className="program-details">
            <h3>Master of Urban Planning/Master of Urban Design</h3>
            <div className="details-grid">
              <div>
                <p>Length</p>
                <p>03 Years</p>
              </div>
              <div>
                <p>Tuition Fee</p>
                <p>49088 AUD / Year</p>
              </div>
              <div>
                <p>Intake</p>
                <p>Feb, July</p>
              </div>
            </div>
            <button className="view-details" onClick={() => openModal('Master of Urban Planning/Master of Urban Design', 'Detailed description of the Master of Urban Planning/Master of Urban Design.')}>View Details</button>
          </div>
          
          {expandedCards[2] && (
            <>
              <div className="program-details">
                <h3>Doctor of Philosophy - Indigenous Knowledge</h3>
                <div className="details-grid">
                  <div>
                    <p>Length</p>
                    <p>04  Years</p>
                  </div>
                  <div>
                    <p>Tuition Fee</p>
                    <p>48000  AUD / Year</p>
                  </div>
                  <div>
                    <p>Intake</p>
                    <p>Jan ,Feb, July</p>
                  </div>
                </div>
                <button className="view-details" onClick={() => openModal('Master of Urban Planning/Master of Urban Design', 'Detailed description of the Master of Urban Planning/Master of Urban Design.')}>View Details</button>
                </div>
              <div className="program-details">
                <h3>Master of Property/Master of Urban Planning</h3>
                <div className="details-grid">
                  <div>
                    <p>Length</p>
                    <p>04 Years</p>
                  </div>
                  <div>
                    <p>Tuition Fee</p>
                    <p>49088  AUD / Year</p>
                  </div>
                  <div>
                    <p>Intake</p>
                    <p>Feb, July</p>
                  </div>
                </div>
                <button className="view-details" onClick={() => openModal('Master of Urban Planning/Master of Urban Design', 'Detailed description of the Master of Urban Planning/Master of Urban Design.')}>View Details</button>
              </div>
            </>
          )}

          <button className="show-more" onClick={() => toggleShowMore(2)}>
            {expandedCards[2] ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* Program Card 3 */}
        <div className="program-card3">
          <div className="header">
            <img src={universityLogo3} alt="University Logo" className="university-logo" />
            <div className="header-details">
              <h2>University of Auckland</h2>
              <p>Auckland, New Zealand</p>
              <div className="location-info">
                <span>National Ranking: 1</span>
              </div>
            </div>
          </div>
          <div className="info-grid">
            <div>
              <h4>Founded in</h4>
              <p>1883</p>
            </div>
            <div>
              <h4>Institution Type</h4>
              <p>Public</p>
            </div>
            <div>
              <h4>Times Higher Ranking</h4>
              <p>81</p>
            </div>
          </div>
          <div className="program-details">
            <h3>Postgraduate Diploma in International Business</h3>
            <div className="details-grid">
              <div>
                <p>Length</p>
                <p>01 Year</p>
              </div>
              <div>
                <p>Tuition Fee</p>
                <p>34000 NZD / Year</p>
              </div>
              <div>
                <p>Intake</p>
                <p>March, July</p>
              </div>
            </div>
            <button className="view-details" onClick={() => openModal('Postgraduate Diploma in International Business', 'Detailed description of the Postgraduate Diploma in International Business.')}>View Details</button>
          </div>

          {expandedCards[3] && (
            <>
              <div className="program-details">
                <h3>Bachelor of Arts / Bachelor of Health Sciences Conjoint</h3>
                <div className="details-grid">
                  <div>
                    <p>Length</p>
                    <p>04 Year</p>
                  </div>
                  <div>
                    <p>Tuition Fee</p>
                    <p>49588  NZD / Year</p>
                  </div>
                  <div>
                    <p>Intake</p>
                    <p>March</p>
                  </div>
                </div>
                <button className="view-details" onClick={() => openModal('Postgraduate Diploma in International Business', 'Detailed description of the Postgraduate Diploma in International Business.')}>View Details</button>
              </div>
              <div className="program-details">
                <h3>Bachelor of Design</h3>
                <div className="details-grid">
                  <div>
                    <p>Length</p>
                    <p>03 Year</p>
                  </div>
                  <div>
                    <p>Tuition Fee</p>
                    <p>45079  NZD / Year</p>
                  </div>
                  <div>
                    <p>Intake</p>
                    <p>March, July</p>
                  </div>
                </div>
                <button className="view-details" onClick={() => openModal('Postgraduate Diploma in International Business', 'Detailed description of the Postgraduate Diploma in International Business.')}>View Details</button>
              </div>
            </>
          )}

          <button className="show-more" onClick={() => toggleShowMore(3)}>
            {expandedCards[3] ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal 
          title={modalDetails.title} 
          description={modalDetails.description} 
          onClose={closeModal} 
        />
      )}
    </div>
  </div>
</div>
      
  );
}

export default ViewPartnerships;

