import { Types } from "mongoose";

const apartmentSchema =
{
    _id: { type: Types.ObjectId, description: 'The id of the apartment', required: true },
    name: { type: String, description: 'The title of the apartment', required: true },
    unitNumber: { type: Number, description: 'The unit number of the apartment', required: true },
    area: { type: Number, description: 'The area of the apartment', required: true },
    project: { type: String, description: 'The project of the apartment', required: true },
    description: { type: String, description: 'The description of the apartment', required: true },
    price: { type: Number, description: 'The price of the apartment', required: true },
    location: { type: String, description: 'The location of the apartment', required: true },
    bedrooms: { type: Number, description: 'The number of bedrooms in the apartment', required: true },
    image: { type: String, description: 'The image of the apartment', required: true },
    bathrooms: { type: Number, description: 'The number of bathrooms in the apartment', required: true },
    city: { type: String, description: 'The city of the apartment', required: true },
    createdAt: { type: Date, description: 'The date the apartment was created', timestamps: true, default: Date.now }
}
const apartementExample = {
    _id: "507f1f77bcf86cd799439011",
    name: "Luxury Downtown Apartment",
    unitNumber: 101,
    project: "Luxury Downtown Apartment",
    description: "Beautiful apartment in the heart of the city",
    price: 2500,
    location: "123 Main St, Downtown",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    createdAt: "2024-03-20T10:00:00Z"
}

export const apartmentDocs = {
    '/api/apartments': {
        get: {
            summary: 'Get all apartments',
            tags: ['Apartments'],
            parameters: [
                {
                    name: 'name',
                    in: 'query',
                    required: false,
                    description: 'Filter apartments by name',
                    schema: {
                        type: 'string'
                    },
                    example: 'Luxury'
                },
                {
                    name: 'unitNumber',
                    in: 'query',
                    required: false,
                    description: 'Filter apartments by unit number',
                    schema: {
                        type: 'number'
                    },
                    example: 101

                },
                {
                    name: 'project',
                    in: 'query',
                    required: false,
                    description: 'Filter apartments by project name',
                    schema: {
                        type: 'string'
                    },
                    example: 'Luxury Downtown Apartment'
                }
            ],
            responses: {
                200: {
                    description: 'List of apartments',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                properties: apartmentSchema
                            },
                            example: [apartementExample]
                        }
                    },
                }, 400: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            summary: 'Create an apartment',
            tags: ['Apartments'],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            required: ['name', 'unitNumber', 'area', 'project', 'description', 'price', 'location', 'bedrooms', 'bathrooms', 'image', 'city'],
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'The title of the apartment',
                                    example: 'Luxury Downtown Apartment'
                                },
                                unitNumber: {
                                    type: 'number',
                                    description: 'The unit number of the apartment',
                                    example: 101
                                },
                                area: {
                                    type: 'number',
                                    description: 'The area of the apartment',
                                    example: 1000
                                },
                                project: {
                                    type: 'string',
                                    description: 'The project of the apartment',
                                    example: 'Luxury Downtown Apartment'
                                },
                                description: {
                                    type: 'string',
                                    description: 'The description of the apartment',
                                    example: 'Beautiful apartment in the heart of the city'
                                },
                                price: {
                                    type: 'number',
                                    description: 'The price of the apartment',
                                    example: 2500
                                },
                                location: {
                                    type: 'string',
                                    description: 'The location of the apartment',
                                    example: '123 Main St, Downtown'
                                },
                                bedrooms: {
                                    type: 'number',
                                    description: 'The number of bedrooms',
                                    example: 2
                                },
                                bathrooms: {
                                    type: 'number',
                                    description: 'The number of bathrooms',
                                    example: 2
                                },
                                image: {
                                    type: 'file',
                                    format: 'binary',
                                    description: 'The apartment image file',
                                },
                                city: {
                                    type: 'string',
                                    description: 'The city of the apartment',
                                    example: 'New York'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Apartment created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: apartmentSchema
                            },
                            example: apartementExample
                        }
                    }
                },
                400: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/apartments/{id}': {
        get: {
            summary: 'Get apartment details',
            tags: ['Apartments'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the apartment to retrieve',
                    schema: {
                        type: 'string'
                    },
                    example: '507f1f77bcf86cd799439011'
                }
            ],
            responses: {
                200: {
                    description: 'Apartment details',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                properties: apartmentSchema
                            },
                            example: apartementExample
                        }
                    }
                }, 400: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: String, description: 'The error message' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}; 