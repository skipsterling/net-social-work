const router = require("express").Router();
const usersRoutes = require("./userRoutes");
const thoughtsRoutes = require("./thoughtRoutes");

router.use("/user", usersRoutes);
router.use("/thought", thoughtsRoutes);

module.exports = router;