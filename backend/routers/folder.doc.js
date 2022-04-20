const addFolderForFile = {
    tags: ['File folder'],
    description: "add folders for files",
    summary: "Add folders for files",
    parameters: [
        {
            name: 'text',
            in: 'body',
            description: 'Folder Name',
            type: 'string',
            example: 'Folder Text',
            required: true,
        },
        {
            name: 'parentFolder',
            in: 'body',
            description: 'Id parent folder',
            type: 'string',
            example: '120432423424',
            required: true,
        },
        {
            name: 'userCreatedFolder',
            in: 'body',
            description: 'User id how created folder',
            type: 'string',
            example: '120432423424',
            required: true,
        },
        {
            name: 'folderType',
            in: 'body',
            description: 'Folder type',
            type: 'string',
            example: '2',
        }
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'text',
                            description: 'Folder text',
                            example: 'folder name'
                        },
                        parentFolder: {
                            type: 'text',
                            description: 'Id parent folder',
                            example: '42342342342'
                        },
                        userCreatedFolder: {
                            type: 'text',
                            description: 'User id',
                            example: '3453453453'
                        },
                        folderType: {
                            type: 'text',
                            description: 'folder type',
                            example: '2'
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
                                "message": "The folder was created",
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

const deleteFolder = {
    tags: ['File folder'],
    description: "Delete folder",
    summary: "You can delete selected folder",
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'folder Id',
            type: 'string',
            required: true,
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'text',
                            description: 'Folder id',
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
                            data: {
                                "message": "The folder was deleted",
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

const getAllFolderByCurrentUser = {
    tags: ['File folder'],
    description: "Get all currentUser folders",
    summary: "Get all folders for current user",
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Current User Id',
            type: 'string',
            required: true,
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'text',
                            description: 'Current User id',
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
                            data: {
                                "folders": [
                                    {
                                        folderType: 2,
                                        name: "4324",
                                        parentFolder: "123",
                                        userCreatedFolder: "62359c3de954121e2c3b9d85",
                                        __v: 0,
                                        _id: "625fbfe016a26a7e3731e2ca",
                                    }
                                ],
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

const updateFolder = {
    tags: ['File folder'],
    description: "Update current Folder",
    summary: "Updating current folder name",
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'Current Folder id',
            type: 'string',
            required: true,
        },
        {
            name: 'data',
            in: 'body',
            description: 'Object for changing fields',
            type: 'object',
            required: true,
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'text',
                            description: 'Current Folder id',
                            example: '625fbfe016a26a7e3731e2ca'
                        },
                        data: {
                            type: 'Object',
                            description: 'Object for changing information',
                            example: {
                                "name": "swagger1111"
                            }
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
                            data: {
                                "message": "Folder name was changed",
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

// https://starkovden.github.io/swagger-ui-tutorial.html

const FoldersForFile = {
    '/folder/': {
        post: addFolderForFile,
    },
    '/folder/{id}': {
        delete: deleteFolder,
    },
    '/folder/all/{id}': {
        get: getAllFolderByCurrentUser
    },
    '/folder/update/{id}': {
        patch: updateFolder
    }
}


module.exports = FoldersForFile;
