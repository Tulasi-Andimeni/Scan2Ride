// const express = require('express');
// const router = express.Router();
// const driverController = require('../controllers/driverController');
// const upload = require('../middleware/uploadMiddleware');

// router.post('/add', upload.single('image'), driverController.addDriver); // handles image file
// router.get('/', driverController.getAllDrivers);
// router.get('/:id', driverController.getDriverById);

// module.exports = router;



// const express = require('express');

// const router = express.Router();
// const driverController = require('../controllers/driverController');
// const upload = require('../middleware/uploadMiddleware');

// // ✅ Add a driver (POST /api/drivers)
// router.post('/', upload.single('image'), driverController.addDriver);

// // ✅ Get all drivers (GET /api/drivers)
// router.get('/', driverController.getAllDrivers);

// // ✅ Get driver by ID (GET /api/drivers/:id)
// router.get('/:id', driverController.getDriverById);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const driverController = require('../controllers/driverController');
// const upload = require('../middleware/uploadMiddleware');

// router.post('/', upload.single('image'), driverController.addDriver);
// router.get('/', driverController.getAllDrivers);
// router.get('/:id', driverController.getDriverById);
// router.put('/:id', upload.single('image'), driverController.updateDriver);
// router.delete('/:id', driverController.deleteDriver);


// module.exports = router;




const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), driverController.addDriver);
router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.put('/:id', upload.single('image'), driverController.updateDriver);
router.put('/:id/delete', driverController.softDeleteDriver);
router.put('/:id/restore', driverController.restoreDriver);

module.exports = router;
