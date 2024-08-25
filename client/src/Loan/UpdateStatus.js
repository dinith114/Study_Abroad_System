import React, { useState } from 'react';

function UpdateStatus({ onClose, row }) {
  const [status, setStatus] = useState(row.status);
  const [ticked, setTicked] = useState({
    formCompleted: false,
    documentsUploaded: false,
    qualificationsCompleted: false,
    approvalReceived: false,
    mortgageProvided: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setTicked(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const canApprove = Object.values(ticked).every(v => v);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    if (status === 'Approve' && !canApprove) {
      alert('Please complete all the steps before approving.');
      return;
    }
    // Save the updated status logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Status for {row.id}</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="Documenting">Documenting</option>
            <option value="Processing">Processing</option>
            <option value="Approve" disabled={!canApprove}>Approve</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Check the following:
          </label>
          <div>
            <input
              type="checkbox"
              name="formCompleted"
              checked={ticked.formCompleted}
              onChange={handleCheckboxChange}
            /> Complete loan application form.
          </div>
          <div>
            <input
              type="checkbox"
              name="documentsUploaded"
              checked={ticked.documentsUploaded}
              onChange={handleCheckboxChange}
            /> Uploaded all required documents.
          </div>
          <div>
            <input
              type="checkbox"
              name="qualificationsCompleted"
              checked={ticked.qualificationsCompleted}
              onChange={handleCheckboxChange}
            /> Complete required education qualifications.
          </div>
          <div>
            <input
              type="checkbox"
              name="approvalReceived"
              checked={ticked.approvalReceived}
              onChange={handleCheckboxChange}
            /> Approval of the foreign educational institute, university, and course.
          </div>
          <div>
            <input
              type="checkbox"
              name="mortgageProvided"
              checked={ticked.mortgageProvided}
              onChange={handleCheckboxChange}
            /> Mortgage of property for security.
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatus;