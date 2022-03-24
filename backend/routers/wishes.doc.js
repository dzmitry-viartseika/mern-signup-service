const sendWishesToEmail = {
    tags: ['User wishes'],
    description: "send to developers your wishes",
    summary: "send wishes",
    parameters: [
        {
            name: 'text',
            in: 'body',
            description: 'wishes text',
            type: 'string',
            example: 'You need to fix bla-bla-bla',
            required: true,
        },
        {
            name: 'email',
            in: 'body',
            description: 'Add your email address',
            type: 'string',
            example: 'test@gmail.com',
            required: true,
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        text: {
                            type: 'text',
                            description: 'Text your message',
                            example: 'Bla-bla-bla message :D:D:D'
                        },
                        email: {
                            type: 'email',
                            description: 'Send your email',
                            example: 'test@gmail.com'
                        },
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
                            data: {
                                "message": "Your message was sent",
                            },
                        }
                    }
                }
            }
        },
        400: {
            description: "Invalid supplied",
        },
    }
}


const UserWishes = {
    '/send-wishes': {
        post: sendWishesToEmail,
    },
}

module.exports = UserWishes;
