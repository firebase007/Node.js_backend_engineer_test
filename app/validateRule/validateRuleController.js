const Response = require('../helper')
const validateRuleService = require('./validateRuleService')

exports.validateRule = async (req, res) => {
	const payload = req.body

	console.log(payload)

	if (!payload.rule) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'Rule field is required.', statusCode: 400, responseBody: null,
		})
	}

	if (!payload.data) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'Data field is required.', statusCode: 400, responseBody: null,
		})
	}

	if (!payload.rule.field) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'field is required.', statusCode: 400, responseBody: null,
		})
	}

	if (!payload.rule.condition) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'condition is required.', statusCode: 400, responseBody: null,
		})
	}

	if (!payload.rule.condition_value) {
		return Response.sendErrorResponse({
			res, status: 'error', message: 'condition_value is required.', statusCode: 400, responseBody: null,
		})
	}

	// accept data a string, arry or json obj
	const dataField1 = payload.data
	if (Array.isArray(dataField1)) {
		console.log(dataField1.length, payload.rule.field, payload.rule.condition_value, '11111', dataField1.length === payload.rule.field)
		if (dataField1.length == payload.rule.field && dataField1.includes(payload.rule.condition_value)) {
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
		return Response.sendErrorResponse({
			res, status: 'error', message: `field ${payload.rule.field} is missing from data.`, statusCode: 400, responseBody: null,
		})
	}

	if ((typeof dataField1 === 'string')) {
		if (dataField1.charAt(Number(payload.rule.field)) !== payload.rule.condition_value) {
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
            		field_value: dataField1.charAt(Number(payload.rule.field)),
            		condition: payload.rule.condition,
            		condition_value: payload.rule.condition_value,

            	},

            },
			})
		}
		if (dataField1.charAt(Number(payload.rule.field)) === payload.rule.condition_value) {
			console.log(payload.rule.condition_value)
			return Response.sendResponse({
				res,
				status: 'success',
				message: `field ${payload.rule.field} successfully validated.`,
				responseBody:

            {
            	validation: {
            		error: false,
            		field: payload.rule.field,
            		field_value: dataField1.charAt(Number(payload.rule.field)),
            		condition: payload.rule.condition,
            		condition_value: payload.rule.condition_value,

            	},

            },
			})
		}
	}

	const expr = payload.rule.condition

	const test = payload.rule.field.split('.')

	if (payload.rule.field || test.length == '2') {
		validateRuleService.getNested(dataField1, test[0], test[1])
			.then((data) => {
				console.log(data)
				const fieldValue = data
				if (!data || data == undefined) {
					console.log(payload.rule.field)
					const fieldValue2 = payload.data.missions
					console.log(Object.keys(payload.data))
					const dat2 = Object.keys(payload.data)
					if (dat2.includes(payload.rule.field)) {
						switch (expr) {
						case 'gte':
							if (fieldValue2 >= payload.rule.condition_value) {
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
							break
						case 'eq':
							if (fieldValue2 === payload.rule.condition_value) {
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
							if (fieldValue2 !== payload.rule.condition_value) {
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
							if (fieldValue2 > payload.rule.condition_value) {
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
							if (fieldValue2.includes(payload.rule.condition_value)) {
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

				switch (expr) {
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
				case 'eq':
					if (fieldValue == payload.rule.condition_value) {
						console.log('got here now', fieldValue, payload.rule.condition_value)
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
						console.log('got here now', fieldValue, payload.rule.condition_value)
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
					if (fieldValue2.includes(payload.rule.condition_value)) {
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
				return Response.sendErrorResponse({
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
			})
	}

	return Response.sendErrorResponse({
		res,
		status: 'error',
		statusCode: 400,
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
