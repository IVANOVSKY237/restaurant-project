const express = require("express");
    const router = express.Router();
    const {isVerifiedUser} = require("../middleware/tokenVerification");
    const { addTable, getTables, updateTable } = require("../controllers/tableController");

    //Table Routes
    router.route("/").post(isVerifiedUser, addTable);
    router.route("/").get(isVerifiedUser, getTables);
    router.route("/:id").put(isVerifiedUser, updateTable);

    module.exports = router;