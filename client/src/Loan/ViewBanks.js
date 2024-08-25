import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BankCard from './BankCard';
import { FaSearch } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai';
import PageTitle from '../Components/PageTitle';
import BankDetailsModal from './BankDetailsModal'; 
import BOC from '../Images/boc.png';
import HNB from "../Images/hnb.png";
import dfcc from "../Images/dfcc.jpg";
import peoples from "../Images/peoples.png";
import seylan from "../Images/seylan.jpg";
import nsb from "../Images/nsb.png";
import panasia from "../Images/panasia.jpg";
import sampath from "../Images/sampath.jpg";

const banks = [
  { id: 1, name: 'Bank of Ceylon', logo: BOC, rank: 2 },
  { id: 2, name: 'HNB Bank', logo: HNB, rank: 2 },
  { id: 3, name: 'DFCC Bank', logo: dfcc, rank: 2 },
  { id: 4, name: 'Peoples Bank', logo: peoples, rank: 2 },
  { id: 5, name: 'Seylan Bank', logo: seylan, rank: 2 },
  { id: 6, name: 'NSB Bank', logo: nsb, rank: 2 },
  { id: 7, name: 'Pan Asia Bank', logo: panasia, rank: 2 },
  { id: 8, name: 'Sampath Bank', logo: sampath, rank: 2 },
];

function ViewBanks() {
  const [selectedBank, setSelectedBank] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewClick = (bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleEditClick = (id) => {
    navigate(`/bank-edit/${id}`);
  };

  const handleAddNewBankClick = () => {
    navigate('/bank-add'); // Navigate to AddNewBank.js page
  };

  const handleApplicationListClick = () => {
    navigate('/loan-app-list');
  };

  return (
    <div className="my-3 p-8 rounded border border-gray-200 lg:mx-10">
      <PageTitle title="Manage Banks" />

      <div className="p-8 lg:mx-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Available Banks</h1>

          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search banks"
                className="border border-gray-300 rounded-lg px-4 py-2 pl-10"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Add New Bank Button */}
            <button
              onClick={handleAddNewBankClick}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
              <span>Add new bank</span>
              <span className="bg-white text-blue-500 p-1 rounded-full">
                <AiOutlinePlus className="w-4 h-4" />
              </span>
            </button>

            {/* Application List Button */}
            <button
              onClick={handleApplicationListClick}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
              <span>Application List</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {banks.map((bank) => (
            <div key={bank.id} className="relative">
              <BankCard
                bankName={bank.name}
                rank={bank.rank}
                logo={bank.logo}
                isSelected={selectedBank?.id === bank.id}
                onViewClick={() => handleViewClick(bank)} // Open modal on button click
              />
              <button
                onClick={() => handleEditClick(bank.id)}
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
              >
                <AiOutlineEdit className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Render the modal when `isModalOpen` is true */}
      {isModalOpen && (
        <BankDetailsModal bank={selectedBank} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ViewBanks;
