const { Router } = require('express');
const router = Router();
const routeRoles = require('./routeRoles');
const routeUsers = require('./routeUsers');

router.use("/api/users/role", routeRoles);
router.use("/api/users", routeUsers);


module.exports = router