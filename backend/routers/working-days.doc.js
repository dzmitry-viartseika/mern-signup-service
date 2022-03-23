const updateDate = {
    tags: ['WorkingDays'],
    description: 'update information about working/holiday day',
    parameters: [
        {
            name: 'date',
            in: 'body',
            description: 'date of working/holiday day',
            type: 'date',
            example: '2022-01-07T00:00:00.000Z',
            required: true,
        },
        {
            name: 'intervalType',
            in: 'body',
            description: 'type of working/holiday day',
            type: 'string',
            example: 'working',
            required: true,
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        date: {
                            type: 'date',
                            description: 'Enter a date',
                            example: '2022-01-07T00:00:00.000Z'
                        },
                        intervalType: {
                            type: 'string',
                            description: 'Enter a holiday or working type',
                            example: 'working',
                            required: true,
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        example: {
                            "calendar": "2022-01-07T00:00:00.000Z",
                            "intervalType": "working",
                            "_id": "623abed213778c3dd929ef02",
                        }
                    }
                }
            }
        }
    }
}

const getWorkingDays = {
    tags: ['WorkingDays'],
    description: "Get list of working days",
    summary: "get list of working days",
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        example: {
                            data: {
                                "calendar": "2022-02-19T00:00:00.000Z",
                                "intervalType": "working",
                                "_id": "623abed213778c3dd929ef02",
                            },
                        }
                    }
                }
            }
        },
        400: {
            description: "Invalid supplied",
        },
        404: {
            description: "List not found",
        },
    }
}


const WorkingDays = {
    "/working-days": {
        get: getWorkingDays,
    },
    "/changed-working-days": {
        patch: updateDate,
    }
}

module.exports = WorkingDays;
