import React from 'react';
import universityLogo3 from '../Images/Cam.jpeg';

const CourseDetails = () => {
  // Inline styles
  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const topSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f0f4f8',
    borderRadius: '12px',
    marginBottom: '30px',
    border: '1px solid #e0e5ec',
    textAlign: 'center'
  };

  const logoStyle = {
    width: '160px',
    height: '160px',
    marginBottom: '20px',
    borderRadius: '50%',
    border: '4px solid #003d7a',
    objectFit: 'cover',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
  };

  const logoHoverStyle = {
    transform: 'scale(1.1)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)'
  };

  const establishmentDetailsStyle = {
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '12px',
    fontSize: '16px',
    border: '1px solid #e0e5ec',
    marginBottom: '30px',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
  };

  const mainContentStyle = {
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    lineHeight: '1.6',
    color: '#444'
  };

  const mainButtonStyle = {
    backgroundColor: '#e63946',
    color: 'white',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    margin: '20px auto',
    display: 'block',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
  };

  const mainButtonHoverStyle = {
    backgroundColor: '#d62839',
    transform: 'scale(1.05)'
  };

  const importantFactsStyle = {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px'
  };

  const importantFactsHeadingStyle = {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#333',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '600'
  };

  const importantFactsTextStyle = {
    marginBottom: '15px',
    fontWeight: '500',
    fontSize: '1.4rem',
    textAlign: 'center'
  };

  const importantFactsListStyle = {
    listStyleType: 'disc',
    paddingLeft: '30px',
    textAlign: 'left'
  };

  const importantFactsListItemStyle = {
    marginBottom: '10px',
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.6'
  };

  return (
    <div style={containerStyle}>
      {/* Top section with the logo and basic info */}
      <div style={topSectionStyle}>
        <img
          src={universityLogo3}
          alt="University of Cambridge Logo"
          style={logoStyle}
         
        />
        <div>
          <h2 style={{ fontSize: '2.4rem', color: '#003d7a', marginBottom: '15px', fontWeight: '700' }}>
            University of Cambridge
          </h2>
          <p style={{ fontSize: '1.5rem', color: '#7d8a92', marginBottom: '10px' }}>
            England, United Kingdom
          </p>
          <p style={{ fontSize: '1.3rem', color: '#444', marginBottom: '20px' }}>
            National Ranking: 1
          </p>
        </div>
      </div>

      {/* Establishment details */}
      <div style={establishmentDetailsStyle}>
        <p><strong>Founded:</strong> 1883</p>
        <p><strong>Establishment:</strong> University</p>
        <p><strong>Type:</strong> Public</p>
        <p><strong>Total Students:</strong> 42,759+</p>
      </div>

      {/* Main content section */}
      <div style={mainContentStyle}>
        <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          PhD in Zoology
        </h3>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          Today, the University of Auckland is the largest university in New Zealand, hosting over 40,000 students on five Auckland campuses.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          The PhD degree is a minimum of three years of full-time research with an individual supervisor. At the end of their degree, students will produce a written thesis, which will be assessed by independent experts, and examined with a viva. This is the principal research degree offered in the Department of Zoology and the great majority of our students are registered for it.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          Students are directly supervised by one of our group leaders, who will support them in developing an independent and novel project in their field of interest. Students will learn how to review relevant literature, to phrase and answer scientific questions, and how to report their findings to the scientific community, at conferences and through peer-reviewed scientific publications. We very much encourage students to get experience in undergraduate teaching, which can be either as demonstrators during practical classes or supervisors teaching small groups.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          At the end of their first year of study, students are required to complete a satisfactory first-year report and viva. A brief report (without viva) is required at the end of the second year and third year.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          All candidates are expected to take part in the Department’s Postgraduate Training Programme and the Postgraduate School of Life Science’s Researcher Development Programme.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          Most candidates take this option starting in October, to take advantage of Departmental and University induction programmes, but admission in January or April is also possible.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'center' }}>
          Please note: part-time study may not always be viable and will be considered on a case-by-case basis, so please discuss this option with your proposed supervisor before making an application for this mode of study.
        </p>
      </div>

      {/* Important Facts Section */}
      <div style={importantFactsStyle}>
        <h4 style={importantFactsHeadingStyle}>Job Opportunity Potential</h4>
        <p style={importantFactsTextStyle}>
          Whether you’re sure of the career you want to pursue when you graduate or you’re looking to explore your options, we’ll help you to prepare for your future.
        </p>
        <ul style={importantFactsListStyle}>
          <li style={importantFactsListItemStyle}>89% of our students who responded to the Graduate Outcomes Survey were in work or further study within 15 months of graduating¹</li>
          <li style={importantFactsListItemStyle}>Top 10 in the UK for graduate prospects (Complete University Guide 2021)</li>
        </ul>
        <h4 style={importantFactsHeadingStyle}>Transferable Skills</h4>
        <p style={importantFactsTextStyle}>
          The majority of graduate employers recruit students with any degree discipline. It’s the flexibility of your degree, as well as the range of transferable skills that you develop, that are of interest to employers.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
          Cambridge students are typically ambitious, intelligent, motivated, hard-working, passionate, committed, curious, intellectually creative, independent thinkers, and able to manage their time effectively. Employers know this and look for the same attributes in potential new employees, which is why our graduates are so sought after.
        </p>
        <h4 style={importantFactsHeadingStyle}>Dedicated Support and Guidance</h4>
        <p style={importantFactsTextStyle}>
          Once you’re at Cambridge, you can work with our dedicated Careers Service from day one to explore your career options. The team of experienced and impartial careers advisers can help you connect with employers and navigate the complex job market, saving you time and maximising your employability prospects.
        </p>
        <ul style={importantFactsListStyle}>
          <li style={importantFactsListItemStyle}>The Careers Service runs a range of workshops on topics including choosing a career, cover letters, applications, and getting ready for interviews.</li>
          <li style={importantFactsListItemStyle}>They also organise more than 200 careers events and briefing and skills sessions, and typically around 15 major careers fairs each year.</li>
        </ul>
        <h4 style={importantFactsHeadingStyle}>Internships and Work Experience</h4>
        <p style={importantFactsTextStyle}>
          Our industry connections provide a range of opportunities for you to undertake work experience, enhancing your CV ready for graduation. Thousands of opportunities are publicised across all sectors on the Careers Service’s Handshake site, with bursaries offered to support unpaid opportunities with charities.
        </p>
        <h4 style={importantFactsHeadingStyle}>Networking Opportunities</h4>
        <p style={importantFactsTextStyle}>
          The Careers Service’s alumni database, GradLink, will give you access to contact details for over 1,200 Cambridge alumni working in a huge range of industries who can offer first-hand advice.
        </p>
        <ul style={importantFactsListStyle}>
          <li style={importantFactsListItemStyle}>The Service also runs more than 50 employment-related skills training sessions and can offer information on occupations, further study courses, and funding.</li>
        </ul>
        <h4 style={importantFactsHeadingStyle}>Graduate Employment Destinations</h4>
        <p style={importantFactsTextStyle}>
          Our graduates go on to work in a wide range of industries. The list below shows the top ten occupations of respondents to the Graduate Outcomes Survey (15 months after graduation).
        </p>
        <ul style={importantFactsListStyle}>
          <li style={importantFactsListItemStyle}>Medical practitioner</li>
          <li style={importantFactsListItemStyle}>Programmer/software development professional</li>
          <li style={importantFactsListItemStyle}>Management consultants and business analysts</li>
          <li style={importantFactsListItemStyle}>Finance and investment analysts and advisers</li>
          <li style={importantFactsListItemStyle}>Marketing associate professionals</li>
          <li style={importantFactsListItemStyle}>Business and related associate professionals</li>
          <li style={importantFactsListItemStyle}>Secondary education teaching professionals</li>
          <li style={importantFactsListItemStyle}>Primary and nursery teaching professionals</li>
          <li style={importantFactsListItemStyle}>University researchers</li>
          <li style={importantFactsListItemStyle}>Higher education teaching professionals</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
