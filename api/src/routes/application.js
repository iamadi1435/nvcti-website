const router = require('express').Router()
const controller = require('../controllers/application')
const { authenticate, verifyAdmin } = require('../utils/auth')
const { bruteforce } = require('../utils/api')
const { multerConfig, storageLimits, fileFilter, fileStorage, directoryNames } 
	= require('../utils/files')

const documentUpload = function(directory) {
	return multerConfig({
		limits: storageLimits.images,
	    fileFilter: fileFilter('documents'),
	    storage: fileStorage(directory)
	})
}

// get many
router.get('/', authenticate, controller.getAllApplication)

// get document
router.get('/:id/document', bruteforce().prevent, 
	authenticate, controller.getSupportingDocument)

// get one
router.get('/:appId', authenticate, controller.getApplicationById)

// add
router.post('/', authenticate, 
	documentUpload(directoryNames.supporting).single('document'), 
	controller.addNewApplication)

// update
router.patch('/:appId', authenticate, 
	documentUpload(directoryNames.supporting).single('document'), 
	controller.updateApplicationById)

// delete
router.delete('/:appId', authenticate, controller.deleteApplicationById)

// get document
router.put('/:id/document', 
	bruteforce().prevent, authenticate, 
	documentUpload(directoryNames.supporting).single('document'), 
	controller.updateSupportingDocument)

// Some direct routes? (If you wish)
// These maybe:
// - fetch status of application
// - change status of application
// - fetch/change remarks

module.exports = router
