import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloudUpload, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import PageTitle from '../Components/PageTitle';

function StudentRegistrationForm() {
  const navigate = useNavigate(); // Hook for navigation
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState('');
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [educationLevel, setEducationLevel] = useState([]);
  const [otherQualifications, setOtherQualifications] = useState('');
  const [examStatus, setExamStatus] = useState('');
  const [incomeLevel, setIncomeLevel] = useState('');
  const [sponsorType, setSponsorType] = useState('');
  const [preferredCourse, setPreferredCourse] = useState('');
  const [preferredCountry, setPreferredCountry] = useState('');
  const [preferredUniversity, setPreferredUniversity] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPG or PNG)');
        return;
      }
      if (file.size > 5000000) { // Restrict to 5MB
        setError('File size should not exceed 5MB');
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = () => {
    // Validation
    if (
      !fullName ||
      !firstName ||
      !lastName ||
      !dob ||
      !age ||
      !nic ||
      !gender ||
      !email ||
      !phone ||
      !address ||
      !educationLevel.length ||
      !examStatus ||
      !incomeLevel ||
      !sponsorType ||
      !preferredCourse ||
      !preferredCountry ||
      !preferredUniversity
    ) {
      setError('Please fill out all fields.');
      return;
    }

    if (isNaN(age)) {
      setError('Age must be a number.');
      return;
    }

    setError('');
    console.log({
      fullName,
      firstName,
      lastName,
      dob,
      age,
      nic,
      gender,
      email,
      phone,
      address,
      selectedImage,
      educationLevel,
      otherQualifications,
      examStatus,
      incomeLevel,
      sponsorType,
      preferredCourse,
      preferredCountry,
      preferredUniversity,
    });

    // Submit registration details (e.g., send to API)
  };

  const handleReset = () => {
    setFullName('');
    setFirstName('');
    setLastName('');
    setDob(null);
    setAge('');
    setNic('');
    setGender('');
    setEmail('');
    setPhone('');
    setAddress('');
    setSelectedImage(null);
    setEducationLevel([]);
    setOtherQualifications('');
    setExamStatus('');
    setIncomeLevel('');
    setSponsorType('');
    setPreferredCourse('');
    setPreferredCountry('');
    setPreferredUniversity('');
    setError('');
  };

  const handleCancel = () => {
    navigate('/student-list'); // Navigate back to the students list page or a specific route
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 max-w-4xl mx-auto mt-10">
      <PageTitle title="Student Registration Form" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Registration</h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="col-span-2">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700">Age</label>
          <input
            type="text"
            value={age}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* NIC */}
        <div className="col-span-2">
          <label className="block text-gray-700">NIC</label>
          <input
            type="text"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Gender */}
        <div className="col-span-2">
          <label className="block text-gray-700">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Mobile Phone */}
        <div className="col-span-2">
          <label className="block text-gray-700">Mobile Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Upload Image */}
        <div className="col-span-2 flex flex-col items-center">
          <label className="block text-gray-700">Upload Image</label>
          <div className="flex flex-col items-center mt-2">
            <div className="relative">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Student"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center">
                  <AiOutlineCloudUpload size={24} className="text-gray-500" />
                </div>
              )}
            </div>
            <label className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-lg cursor-pointer">
              Upload
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Education Level */}
        <div className="col-span-2">
          <label className="block text-gray-700">Education Level</label>
          <select
            multiple
            value={educationLevel}
            onChange={(e) => setEducationLevel(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          >
            <option value="highschool">High School</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">Ph.D.</option>
          </select>
        </div>

        {/* Other Qualifications */}
        <div className="col-span-2">
          <label className="block text-gray-700">Other Qualifications</label>
          <textarea
            value={otherQualifications}
            onChange={(e) => setOtherQualifications(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Exam Status */}
        <div className="col-span-2">
          <label className="block text-gray-700">Exam Status</label>
          <input
            type="text"
            value={examStatus}
            onChange={(e) => setExamStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Income Level */}
        <div className="col-span-2">
          <label className="block text-gray-700">Income Level</label>
          <input
            type="text"
            value={incomeLevel}
            onChange={(e) => setIncomeLevel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Sponsor Type */}
        <div className="col-span-2">
          <label className="block text-gray-700">Sponsor Type</label>
          <input
            type="text"
            value={sponsorType}
            onChange={(e) => setSponsorType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Preferred Course */}
        <div className="col-span-2">
          <label className="block text-gray-700">Preferred Course</label>
          <input
            type="text"
            value={preferredCourse}
            onChange={(e) => setPreferredCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Preferred Country */}
        <div className="col-span-2">
          <label className="block text-gray-700">Preferred Country</label>
          <input
            type="text"
            value={preferredCountry}
            onChange={(e) => setPreferredCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>

        {/* Preferred University */}
        <div className="col-span-2">
          <label className="block text-gray-700">Preferred University</label>
          <input
            type="text"
            value={preferredUniversity}
            onChange={(e) => setPreferredUniversity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 flex items-center"
        >
          <AiOutlineSave className="mr-2" />
          Save
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 flex items-center"
        >
          <AiOutlineClose className="mr-2" />
          Reset
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <AiOutlineClose className="mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default StudentRegistrationForm;


