const Response = require('../helper')
const validateRuleService = require('./validateRuleService')

exports.validateRule = async (req, res) => {

    // accept req.body from client
	const payload = req.body

	console.log(payload)

    // check for data field is passed
	if (!payload.data) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'Data field is required.', statusCode: 400, responseBody: null,
		})
    }
    
    // check for rule field is passed
    if (!payload.rule) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'Rule field is required.', statusCode: 400, responseBody: null,
		})
	}

	// // get data field payload
    const dataField = payload.data

    console.log(payload)
    
    //check when data field is an array
	if (Array.isArray(dataField)) {
		if (dataField.length == payload.rule.field && dataField.includes(payload.rule.condition_value)) {
			return Response.sendResponse({
				res,
				status: 'success',
				message: `field ${payload.rule.field} successfully validated.`,
				responseBody: {
					validation: {
						error: false,
						field: payload.rule.field,
						field_value: payload.rule.condition_value,
						condition: payload.rule ? payload.rule.condition : '',
						condition_value: payload.rule.condition_value,

					},
				},
			})
		}
		return Response.sendErrorResponse({
			res, status: 'error', message: `field ${payload.rule.field} is missing from data.`, statusCode: 400, responseBody: null,
		})
	}

    // check when dataField as string
	if ((typeof dataField === 'string')) {
		if (dataField.charAt(Number(payload.rule.field)) !== payload.rule.condition_value) {
			return Response.sendErrorResponse({
				res,
				status: 'error',
				message: `field ${payload.rule.field} fialed validation.`,
				statusCode: 400,
				responseBody:

            {
            	validation: {
            		error: true,
            		field: payload.rule.field,
            		field_value: dataField.charAt(Number(payload.rule.field)),
            		condition: payload.rule.condition,
            		condition_value: payload.rule.condition_value,

            	},

            },
			})
		}
		if (dataField.charAt(Number(payload.rule.field)) === payload.rule.condition_value) {
			return Response.sendResponse({
				res,
				status: 'success',
				message: `field ${payload.rule.field} successfully validated.`,
				responseBody:

            {
            	validation: {
            		error: false,
            		field: payload.rule.field,
            		field_value: dataField.charAt(Number(payload.rule.field)),
            		condition: payload.rule.condition,
            		condition_value: payload.rule.condition_value,

            	},

            },
			})
		}
	}

    const ruleCondition = payload.rule.condition
    
    console.log(ruleCondition)

    const checkFieldNesting = payload.rule.field.split('.')
    
    console.log(checkFieldNesting)

    // check if rule field exists and check the depth of the nesting
	if (payload.rule.field && checkFieldNesting.length == '2') {
		validateRuleService.getNested(dataField, checkFieldNesting[0], checkFieldNesting[1])
			.then((data) => {
                const fieldValue = data
                console.log(fieldValue, '00000000')           
            // switch condition for when field is nested
				switch (ruleCondition) {
				case 'gte':
					if (fieldValue >= payload.rule.condition_value) {
						return Response.sendResponse({
							res,
							status: 'success',
							message: `field ${payload.rule.field} successfully validated.`,
							responseBody:

                    {
                    	validation: {
                    		error: false,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
						})
                    }
                    else {
                         Response.sendErrorResponse({
                            res,
                            statusCode: 400,
                            status: 'error',
                            message: `field ${payload.rule.field} failed validation.`,
                            responseBody:
    
                        {
                            validation: {
                                error: true,
                                field: payload.rule.field,
                                field_value: fieldValue,
                                condition: payload.rule.condition,
                                condition_value: payload.rule.condition_value,
    
                            },
    
                        },
                        })
                    }
				
					break
				case 'eq':
					if (fieldValue == payload.rule.condition_value) {
						return Response.sendResponse({
							res,
							status: 'success',
							message: `field ${payload.rule.field} successfully validated.`,
							responseBody:

                    {
                    	validation: {
                    		error: false,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
						})
					}
					Response.sendErrorResponse({
						res,
						statusCode: 400,
						status: 'error',
						message: `field ${payload.rule.field} failed validation.`,
						responseBody:

                    {
                    	validation: {
                    		error: true,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
					})

					break
				case 'neq':
					if (fieldValue !== payload.rule.condition_value) {
						return Response.sendResponse({
							res,
							status: 'success',
							message: `field ${payload.rule.field} successfully validated.`,
							responseBody:

                    {
                    	validation: {
                    		error: false,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
						})
					}
					Response.sendErrorResponse({
						res,
						statusCode: 400,
						status: 'error',
						message: `field ${payload.rule.field} failed validation.`,
						responseBody:

                    {
                    	validation: {
                    		error: true,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
					})

					break
				case 'gt':
					if (fieldValue > payload.rule.condition_value) {
						return Response.sendResponse({
							res,
							status: 'success',
							message: `field ${payload.rule.field} successfully validated.`,
							responseBody:

                    {
                    	validation: {
                    		error: false,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
						})
					}
					Response.sendErrorResponse({
						res,
						statusCode: 400,
						status: 'error',
						message: `field ${payload.rule.field} failed validation.`,
						responseBody:

                    {
                    	validation: {
                    		error: true,
                    		field: payload.rule.field,
                    		field_value: fieldValue,
                    		condition: payload.rule.condition,
                    		condition_value: payload.rule.condition_value,

                    	},

                    },
					})
					break
				case 'contains':
					if (dataMissionsField.includes(payload.rule.condition_value)) {
						return Response.sendResponse({
							res,
							status: 'success',
							message: `field ${payload.rule.field} successfully validated.`,
							responseBody: {
								validation: {
									error: false,
									field: payload.rule.field,
									field_value: payload.rule.condition_value,
									condition: payload.rule.condition,
									condition_value: payload.rule.condition_value,

								},
							},
						})
					}
					Response.sendErrorResponse({
						res, status: 'error', message: `field ${payload.rule.field} is missing from data.`, statusCode: 400, responseBody: null,
					})

					break

				default:
					Response.sendErrorResponse({
						res,
						status: 'error',
						statusCode: 400,
						message: `field ${payload.rule.field} failed validation.`,
						responseBody:

                            {
                            	validation: {
                            		error: true,
                            		field: payload.rule.field,
                            		condition: payload.rule.condition,
                            		condition_value: payload.rule.condition_value,

                            	},

                            },
					})

					break
                }
			}).catch((err) => {
				console.error(err)	
			})
        } else {
    
                    
                        const dataMissionsField = payload.data.missions

                        const fieldValue = payload.rule.field;
    
                        //get all the data Object keys, so we can do a match of keys
                        const getDataObjKeys = Object.keys(payload.data)
                        if (getDataObjKeys.includes(payload.rule.field)) {
                            // switch statement for non-nested obj
                            switch (ruleCondition) {
                            case 'gte':
                                if (dataMissionsField >= payload.rule.condition_value) {
                                    return Response.sendResponse({
                                        res,
                                        status: 'success',
                                        message: `field ${payload.rule.field} successfully validated.`,
                                        responseBody:
    
                                {
                                    validation: {
                                        error: false,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                    })
                                }
                                Response.sendErrorResponse({
                                    res,
                                    status: 'error',
                                    message: `field ${payload.rule.field} failed validation.`,
                                    statusCode: 400,
                                    responseBody:
    
                                {
                                    validation: {
                                        error: true,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                })
                                break;
                            case 'eq':
                                if (dataMissionsField === payload.rule.condition_value) {
                                    return Response.sendResponse({
                                        res,
                                        status: 'success',
                                        message: `field ${payload.rule.field} successfully validated.`,
                                        responseBody:
    
                                {
                                    validation: {
                                        error: false,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                    })
                                }
                                Response.sendErrorResponse({
                                    res,
                                    status: 'error',
                                    message: `field ${payload.rule.field} failed validation.`,
                                    responseBody:
    
                                {
                                    validation: {
                                        error: true,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                })
    
                                break
                            case 'neq':
                                if (dataMissionsField !== payload.rule.condition_value) {
                                    return Response.sendResponse({
                                        res,
                                        status: 'success',
                                        message: `field ${payload.rule.field} successfully validated.`,
                                        responseBody:
    
                                {
                                    validation: {
                                        error: false,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                    })
                                }
                                Response.sendErrorResponse({
                                    res,
                                    statusCode: 400,
                                    status: 'error',
                                    message: `field ${payload.rule.field} failed validation.`,
                                    responseBody:
    
                                {
                                    validation: {
                                        error: true,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                })
    
                                break
                            case 'gt':
                                if (dataMissionsField > payload.rule.condition_value) {
                                    return Response.sendResponse({
                                        res,
                                        status: 'success',
                                        message: `field ${payload.rule.field} successfully validated.`,
                                        responseBody:
    
                        {
                            validation: {
                                error: false,
                                field: payload.rule.field,
                                field_value: fieldValue,
                                condition: payload.rule.condition,
                                condition_value: payload.rule.condition_value,
    
                            },
    
                        },
                                    })
                                }
                                Response.sendErrorResponse({
                                    res,
                                    statusCode: 400,
                                    status: 'error',
                                    message: `field ${payload.rule.field} failed validation.`,
                                    responseBody:
    
                        {
                            validation: {
                                error: true,
                                field: payload.rule.field,
                                field_value: fieldValue,
                                condition: payload.rule.condition,
                                condition_value: payload.rule.condition_value,
    
                            },
    
                        },
                                })
    
                                break
                            case 'contains':
                                if (dataMissionsField.includes(payload.rule.condition_value)) {
                                    return Response.sendResponse({
                                        res,
                                        status: 'success',
                                        message: `field ${payload.rule.field} successfully validated.`,
                                        responseBody: {
                                            validation: {
                                                error: false,
                                                field: payload.rule.field,
                                                field_value: fieldValue,
                                                field_value: payload.rule.condition_value,
                                                condition: payload.rule.condition,
                                                condition_value: payload.rule.condition_value,
    
                                            },
                                        },
                                    })
                                }
                                Response.sendErrorResponse({
                                    res, status: 'error', message: `field ${payload.rule.field} is missing from data.`, statusCode: 400, responseBody: null,
                                })
    
                                break
    
                            default:
                                Response.sendErrorResponse({
                                    res,
                                    statusCode: 400,
                                    status: 'error',
                                    message: `field ${payload.rule.field} failed validation.`,
                                    responseBody:
    
                                {
                                    validation: {
                                        error: true,
                                        field: payload.rule.field,
                                        field_value: fieldValue,
                                        condition: payload.rule.condition,
                                        condition_value: payload.rule.condition_value,
    
                                    },
    
                                },
                                })
    
                                break
                            }
                        }
                        Response.sendErrorResponse({
                            res, statusCode: 400, status: 'error', message: `field ${payload.rule.field} is missing from data.`, responseBody: null,
                        })
                    }
}
