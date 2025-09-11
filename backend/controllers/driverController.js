// const Driver = require('../models/driverModel');

// // Add new driver
// exports.addDriver = async (req, res) => {
//   try {
//     const newDriver = new Driver(req.body);
//     await newDriver.save();
//     res.status(201).json({ message: 'Driver added successfully', driver: newDriver });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all drivers
// exports.getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find();
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get driver by ID
// exports.getDriverById = async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);
//     if (!driver) return res.status(404).json({ message: 'Driver not found' });
//     res.json(driver);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// const Driver = require('../models/driverModel');
// const path = require('path');

// // Add new driver with image upload
// exports.addDriver = async (req, res) => {
//   try {
//     const {
//       name,
//       phoneNumber,
//       busNumber,
//       experienceYears,
//       assignedRoute,
//     } = req.body;

//     // Check if file was uploaded
//     const image = req.file ? `/uploads/${req.file.filename}` : "";

//     const newDriver = new Driver({
//       name,
//       phoneNumber,
//       busNumber,
//       experienceYears,
//       assignedRoute,
//       image, // Save uploaded image path
//     });

//     await newDriver.save();
//     res.status(201).json({ message: 'Driver added successfully', driver: newDriver });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all drivers
// exports.getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find();
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get driver by ID
// exports.getDriverById = async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);
//     if (!driver) return res.status(404).json({ message: 'Driver not found' });
//     res.json(driver);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const Driver = require('../models/driverModel');
// const path = require('path');

// // Add new driver with image upload
// exports.addDriver = async (req, res) => {
//   try {
//     const {
//       name,
//       phoneNumber,
//       busNumber,
//       assignedRoute,
//     } = req.body;

//     // ✅ Convert to number explicitly
//     const experienceYears = parseInt(req.body.experienceYears) || 0;

//     // const image = req.file ? `/uploads/${req.file.filename}` : "";
//    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : "";


//     const newDriver = new Driver({
//       name,
//       phoneNumber,
//       busNumber,
//       experienceYears,
//       assignedRoute,
//       image,
//     });

//     await newDriver.save();

//     res.status(201).json({
//       message: 'Driver added successfully',
//       driver: newDriver,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all drivers
// exports.getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find();
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get driver by ID
// exports.getDriverById = async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);
//     if (!driver) return res.status(404).json({ message: 'Driver not found' });
//     res.json(driver);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// const Driver = require('../models/driverModel');


// // Add new driver with image upload
// exports.addDriver = async (req, res) => {
//   try {
//     const {
//       name,
//       phoneNumber,
//       busNumber,
//       assignedRoute,
//     } = req.body;

//     const experienceYears = parseInt(req.body.experienceYears) || 0;

//     const image = req.file
//       ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
//       : "";

//     const newDriver = new Driver({
//       name,
//       phoneNumber,
//       busNumber,
//       experienceYears,
//       assignedRoute,
//       image,
//     });

//     await newDriver.save();

//     res.status(201).json({
//       message: 'Driver added successfully',
//       driver: newDriver,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Get all drivers
// exports.getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find();
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get driver by ID
// exports.getDriverById = async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.id);
//     if (!driver) {
//       return res.status(404).json({ message: 'Driver not found' });
//     }
//     res.json(driver);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update driver
// exports.updateDriver = async (req, res) => {
//   try {
//     const {
//       name,
//       phoneNumber,
//       busNumber,
//       experienceYears,
//       assignedRoute
//     } = req.body;

//     const image = req.file
//       ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
//       : undefined;

//     const updateData = {
//       name,
//       phoneNumber,
//       busNumber,
//       experienceYears: parseInt(experienceYears) || 0,
//       assignedRoute
//     };

//     if (image) updateData.image = image;

//     const updated = await Driver.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     res.json({
//       message: "Driver updated successfully",
//       driver: updated
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete driver
// exports.deleteDriver = async (req, res) => {
//   try {
//     const deleted = await Driver.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Driver not found" });
//     }

//     res.json({ message: "Driver deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };






const Driver = require('../models/driverModel');

exports.addDriver = async (req, res) => {
  try {
    const { name, phoneNumber, busNumber, assignedRoute } = req.body;
    const experienceYears = parseInt(req.body.experienceYears) || 0;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newDriver = new Driver({
      name,
      phoneNumber,
      busNumber,
      experienceYears,
      assignedRoute,
      image,
    });

    await newDriver.save();
    res.status(201).json({ message: 'Driver added successfully', driver: newDriver });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const { name, phoneNumber, busNumber, experienceYears, assignedRoute } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      name,
      phoneNumber,
      busNumber,
      experienceYears: parseInt(experienceYears) || 0,
      assignedRoute,
    };

    if (image) updateData.image = image;

    const updated = await Driver.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Driver not found' });

    res.json({ message: 'Driver updated successfully', driver: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.softDeleteDriver = async (req, res) => {
  try {
    const updated = await Driver.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver soft-deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreDriver = async (req, res) => {
  try {
    const restored = await Driver.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true });
    if (!restored) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver restored successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
