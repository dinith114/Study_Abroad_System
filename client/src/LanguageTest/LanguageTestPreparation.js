import React from 'react';
import styled from 'styled-components';
import ielts from "../Images/ielts.png"; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

// Styled-components definitions
const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Content = styled.div`
  max-width: 800px; /* Set a maximum width for the content */
  margin: 0 auto; /* Center the content on the page */
`;

const ImageSection = styled.div`
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const TextSection = styled.div`
  padding: 10px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #34495e;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Center the buttons */
  gap: 10px; /* Add space between buttons */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
  font-size: 14px;
  color: #777;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 5px 0;
`;

// React component
const LanguageTestPreparation = () => {
  const navigate = useNavigate(); 

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };
  return (
    <Container>
      <Header>Language Test Preparation</Header>
      <Content>
      <ImageSection>
          <Image src={ielts} alt="Language Test Preparation" />
        </ImageSection>
        <TextSection>
          <Description>
            To prepare for a language test, start by understanding the test format and 
            creating a study plan tailored to your strengths and weaknesses. 
            Regular practice with official materials is crucial, along with building 
            vocabulary and enhancing listening, reading, writing, and speaking skills. 
            Focus on grammar accuracy and manage test-day anxiety by staying calm and 
            well-rested. Consistent practice, reviewing mistakes, and tracking progress 
            will help you improve and succeed on test day.
          </Description>
          <ButtonContainer>
          <ButtonContainer>
            <Button onClick={() => handleNavigation('/IELTSPage')}>IELTS</Button> {/* Navigate to IELTS page */}
            <Button onClick={() => handleNavigation('/PTEPage')}>PTE</Button> {/* Navigate to PTE page */}
          </ButtonContainer>
          </ButtonContainer>
        </TextSection>
      </Content>
    </Container>
  );
};

export default LanguageTestPreparation;
