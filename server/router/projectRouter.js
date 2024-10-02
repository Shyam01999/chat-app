const { authentication, authorizeRole } = require('../controller/authController/authController');
const { createProject, getAllProject, getProjectById, getProjectByUserId, updateProject, deleteProject } = require('../controller/projectController/projectController');

const projectRouter = require('express').Router();

projectRouter.route('/create').post(authentication, authorizeRole('1'), createProject);
projectRouter.route('/getall').get(authentication, getAllProject);
projectRouter.route('/get/:id').get(authentication, getProjectById);
projectRouter.route('/userid').get(authentication, getProjectByUserId);
projectRouter.route('/update').patch(authentication, updateProject);
projectRouter.route('/delete/:id').delete(authentication, deleteProject);

module.exports = projectRouter;

