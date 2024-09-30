const Partnership = require('../models/Partnership');

// Controller to add a new university partnership
const addPartnership = async (req, res) => {
  try {
    const { universityName, ranking, foundedIn, institutionType, country, address } = req.body;
    
    // Create a new partnership document
    const newPartnership = new Partnership({
      universityName,
      ranking,
      foundedIn,
      institutionType,
      country,
      address,
    });

    // Save the new partnership to the database
    await newPartnership.save();
    
    res.status(201).json({ message: 'Partnership added successfully', data: newPartnership });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add partnership', error: error.message });
  }
};

// Controller to get all university partnerships
const getPartnerships = async (req, res) => {
  try {
    const partnerships = await Partnership.find();
    res.status(200).json({ message: 'Partnerships retrieved successfully', data: partnerships });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve partnerships', error: error.message });
  }
};

// Controller to get a single university partnership by ID
const getPartnershipsById = async (req, res) => {
  try {
    const { id } = req.params;
    const partnership = await Partnership.findById(id);

    if (!partnership) {
      return res.status(404).json({ message: 'Partnership not found' });
    }

    res.status(200).json({ message: 'Partnership retrieved successfully', data: partnership });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve partnership', error: error.message });
  }
};

// Controller to update a university partnership by ID
const updatePartnership = async (req, res) => {
  try {
    const { id } = req.params;
    const { universityName, ranking, foundedIn, institutionType, country, address } = req.body;

    const updatedPartnership = await Partnership.findByIdAndUpdate(
      id,
      { universityName, ranking, foundedIn, institutionType, country, address },
      { new: true }
    );

    if (!updatedPartnership) {
      return res.status(404).json({ message: 'Partnership not found' });
    }

    res.status(200).json({ message: 'Partnership updated successfully', data: updatedPartnership });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update partnership', error: error.message });
  }
};

// Controller to delete a university partnership by ID
const deletePartnership = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPartnership = await Partnership.findByIdAndDelete(id);

    if (!deletedPartnership) {
      return res.status(404).json({ message: 'Partnership not found' });
    }

    res.status(200).json({ message: 'Partnership deleted successfully', data: deletedPartnership });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete partnership', error: error.message });
  }
};

module.exports = {
  addPartnership,
  getPartnerships,
  getPartnershipsById,
  updatePartnership,
  deletePartnership,
};
