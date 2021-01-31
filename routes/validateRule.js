const express = require("express");
const router = express.Router();

//get controller
const validateRuleController = require("../app/validateRule/validateRuleController");
const validateRuleValidator = require("../app/validateRule/validateRuleValidator");

router.post("/validate-rule", validateRuleValidator.validateRule,validateRuleController.validateRule);


module.exports = router;