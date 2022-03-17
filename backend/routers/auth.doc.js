const createUser = {
    tags: ['Auth'],
    description: 'Create a user',
    parameters: {},
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email of the user',
                            example: 'test@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                            example: '123test'
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
                            count: 0,
                            users: [],
                        }
                    }
                }
            }
        }
    }
}

const getUser = {
    tags: ['Auth'],
    description: "Get current User info",
    responses: {
        200: {
            description: 'OK',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        example: {
                            user: {
                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ20zYWlsLmNvbSIsImlkIjoiNjIzMmVkYzRjYjAxYzYwMmNiZTBhZDBjIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NDc1MDQ4MzcsImV4cCI6MTY0NzUwNTczN30.AWSHMNJbKj2cfQKnU2-YiF6L2mcLFCm2Sqs_FDC6H_E",
                                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ20zYWlsLmNvbSIsImlkIjoiNjIzMmVkYzRjYjAxYzYwMmNiZTBhZDBjIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NDc1MDQ4MzcsImV4cCI6MTY1MDA5NjgzN30.XjR-LJxk7qTi6mzbGXLHPrktiayXbWpWf_HfbSR7vpM",
                                "user": {
                                    "email": "test@gm3ail.com",
                                    "id": "6232edc4cb01c602cbe0ad0c",
                                    "isActivated": false
                                }
                            },
                        }
                    }
                }
            }
        }
    }
}

const loginUser = {
    tags: ['Auth'],
    description: "Sign in user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email of the user',
                            example: 'test@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                            example: '123test'
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
                            user: {
                                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ20zYWlsLmNvbSIsImlkIjoiNjIzMmVkYzRjYjAxYzYwMmNiZTBhZDBjIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NDc1MDQ4MzcsImV4cCI6MTY0NzUwNTczN30.AWSHMNJbKj2cfQKnU2-YiF6L2mcLFCm2Sqs_FDC6H_E",
                                "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ20zYWlsLmNvbSIsImlkIjoiNjIzMmVkYzRjYjAxYzYwMmNiZTBhZDBjIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2NDc1MDQ4MzcsImV4cCI6MTY1MDA5NjgzN30.XjR-LJxk7qTi6mzbGXLHPrktiayXbWpWf_HfbSR7vpM",
                                "user": {
                                    "email": "test@gm3ail.com",
                                    "id": "6232edc4cb01c602cbe0ad0c",
                                    "isActivated": false
                                }
                            },
                        }
                    }
                }
            }
        }
    }
}

const authDocs = {
    "/registration": {
        post: createUser,
    },
    "/login": {
        post: loginUser,
    },
    "/me": {
        get: getUser,
    }
}

module.exports = authDocs;
