const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const ACTIONS = require('../constants/actions');

const authed = require('../middlewares/authed');
const checkPermission = require('../middlewares/checkPermission');

const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const organizationsController = require('../controllers/organizations');
const departmentsController = require('../controllers/departments');
const userGroupsController = require('../controllers/userGroups');
/// HERE Inject Controller Require ///

/// Session ///
router.post('/login', authController.login);
router.get('/session', authed, authController.session);
router.get('/org', authed, organizationsController.getUserOrganization);
router.post('/logout', authed, authController.logout);


/// Users ///
const { rolesToRoleMiddleware, genCheckUserPermissions } = usersController;
router.get('/admin/users/short', authed, checkPermission(ACTIONS.USERS_READ), usersController.getShortItems);
router.get('/admin/users/:roles', authed, rolesToRoleMiddleware, genCheckUserPermissions('read'), usersController.getList);
router.post('/admin/users/:roles', authed, rolesToRoleMiddleware, genCheckUserPermissions('create'), usersController.createItem);
router.get('/admin/users/:roles/:id', authed, rolesToRoleMiddleware, genCheckUserPermissions('read'), usersController.getItem);
router.put('/admin/users/:roles/:id', authed, rolesToRoleMiddleware, genCheckUserPermissions('update'), usersController.updateItem);
router.delete('/admin/users/:roles/:id', authed, rolesToRoleMiddleware, genCheckUserPermissions('delete'), usersController.dropItem);

/// Organizations ///
router.get('/admin/organizations', authed, checkPermission(ACTIONS.ORGANIZATIONS_READ), organizationsController.getList);
router.get('/admin/organizations/short', authed, checkPermission(ACTIONS.ORGANIZATIONS_READ), organizationsController.getShortItems);
router.post('/admin/organizations', authed, checkPermission(ACTIONS.ORGANIZATIONS_CREATE), organizationsController.createItem);
router.get('/admin/organizations/:id', authed, checkPermission(ACTIONS.ORGANIZATIONS_READ), organizationsController.getItem);
router.put('/admin/organizations/:id', authed, checkPermission(ACTIONS.ORGANIZATIONS_UPDATE), organizationsController.updateItem);
router.delete('/admin/organizations/:id', authed, checkPermission(ACTIONS.ORGANIZATIONS_DELETE), organizationsController.dropItem);

/// Departments ///
router.get('/admin/departments', authed, checkPermission(ACTIONS.DEPARTMENTS_READ), departmentsController.getList);
router.get('/admin/departments/short', authed, checkPermission(ACTIONS.DEPARTMENTS_READ), departmentsController.getShortItems);
router.post('/admin/departments', authed, checkPermission(ACTIONS.DEPARTMENTS_CREATE), departmentsController.createItem);
router.get('/admin/departments/:id', authed, checkPermission(ACTIONS.DEPARTMENTS_READ), departmentsController.getItem);
router.put('/admin/departments/:id', authed, checkPermission(ACTIONS.DEPARTMENTS_UPDATE), departmentsController.updateItem);
router.delete('/admin/departments/:id', authed, checkPermission(ACTIONS.DEPARTMENTS_DELETE), departmentsController.dropItem);

/// UserGroups ///
router.get('/admin/userGroups', authed, checkPermission(ACTIONS.USER_GROUPS_READ), userGroupsController.getList);
router.get('/admin/userGroups/short', authed, checkPermission(ACTIONS.USER_GROUPS_READ), userGroupsController.getShortItems);
router.post('/admin/userGroups', authed, checkPermission(ACTIONS.USER_GROUPS_CREATE), userGroupsController.createItem);
router.get('/admin/userGroups/:id', authed, checkPermission(ACTIONS.USER_GROUPS_READ), userGroupsController.getItem);
router.put('/admin/userGroups/:id', authed, checkPermission(ACTIONS.USER_GROUPS_UPDATE), userGroupsController.updateItem);
router.delete('/admin/userGroups/:id', authed, checkPermission(ACTIONS.USER_GROUPS_DELETE), userGroupsController.dropItem);
router.get('/admin/userGroupUsers/:id', authed, checkPermission(ACTIONS.USER_GROUPS_READ), userGroupsController.getGroupUsersList);
router.post('/admin/userGroupUsers/:id/:userId', authed, checkPermission(ACTIONS.USER_GROUPS_UPDATE), userGroupsController.addUserToGroup);
router.delete('/admin/userGroupUsers/:id/:userId', authed, checkPermission(ACTIONS.USER_GROUPS_UPDATE), userGroupsController.dropUserFromGroup);

/// HERE Inject Controller Routes ///


module.exports = router;
