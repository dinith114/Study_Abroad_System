import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
  font-weight: 700;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #555;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  transition: background-color 0.3s;
  flex: 1;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #ccc;
  color: #333;
  border-radius: 8px;
  transition: background-color 0.3s;
  flex: 1;

  &:hover {
    background-color: #999;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: green;
  text-align: center;
`;

// EditPackage Component
const EditPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [formData, setFormData] = useState({
    packageName: '',
    type: '',
    url: ''
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    viewPackageData();
  }, []);

  const viewPackageData = async () => {
    try {
      let response = await axios.get(`http://localhost:5000/languagePrep/viewOnepackage/${id}`);
      const { packageName, type, url } = response.data;

      setFormData({
        packageName: packageName || '',
        type: type || '',
        url: url || ''
      });
    } catch (error) {
      console.error('Error fetching package data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate each field as the user types or selects
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'packageName') {
      if (!value || value.length < 3) {
        error = 'Package name must be at least 3 characters long';
      }
    }

    if (name === 'type') {
      if (!value) {
        error = 'Please select a package type';
      }
    }

    if (name === 'url') {
      const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');
      if (!value || !urlPattern.test(value)) {
        error = 'Please enter a valid URL';
      }
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const validateForm = () => {
    let formIsValid = true;

    for (let name in formData) {
      validateField(name, formData[name]);
    }

    // Check if there are any errors in the current state
    for (let key in errors) {
      if (errors[key]) {
        formIsValid = false;
      }
    }

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/languagePrep/editpackage/${id}`, formData);

      if (response.status === 200) {
        navigate("/PackageList");
        setMessage('Package updated successfully!');
      } else {
        setMessage('Error updating package.');
      }
    } catch (error) {
      console.error('Error updating package:', error);
      setMessage('Error updating package.');
    }
  };

  const handleNav=()=>{
    navigate("/PackageList")
  }

  return (
    <Container>
      <FormContainer>
        <Header>Edit Package</Header>
        <FormTitle>Package Details</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Label>Package Name:</Label>
          <Input 
            type="text" 
            name="packageName" 
            value={formData.packageName} 
            onChange={handleChange} 
          />
          {errors.packageName && <Message style={{ color: 'red' }}>{errors.packageName}</Message>}

          <Label>Type:</Label>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <option value="" disabled>Select package type</option>
            <option value="PTE Beginner">PTE Beginner</option>
            <option value="IELTS Expert">IELTS Expert</option>
            <option value="PTE Expert">PTE Expert</option>
          </Select>
          {errors.type && <Message style={{ color: 'red' }}>{errors.type}</Message>}

          <Label>URL:</Label>
          <Input 
            type="url" 
            name="url" 
            value={formData.url} 
            onChange={handleChange} 
          />
          {errors.url && <Message style={{ color: 'red' }}>{errors.url}</Message>}

          <ButtonContainer>
            <SubmitButton type="submit">Update Package</SubmitButton>
            <CancelButton type="button" onClick={handleNav}>
              Cancel
            </CancelButton>
          </ButtonContainer>
        </Form>
        {message && <Message>{message}</Message>}
      </FormContainer>
    </Container>
  );
};

export default EditPackage;
