const { Router } = require('express');
const router = Router();
const routeRoles = require('./routeRoles');
const routeUsers = require('./routeUsers');
const routeLogin = require('./routeLogin');

router.use("/api/users/role", routeRoles);
router.use("/api/users", routeUsers);
router.use("/api/auth", routeLogin);


module.exports = router