const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controller/user");
const { getUserById } = require("../controller/user");
const { patchUserById } = require("../controller/user");
const { deleteUserById } = require("../controller/user");
const { handlecreateUser } = require("../controller/user");
//html data for server side rendering
router.route("/")
.get( getAllUsers)
.post(handlecreateUser);

router.route("/:id")
.get(getUserById)//using dynamic route parameter
.patch(patchUserById)
.delete(deleteUserById);



module.exports = router;