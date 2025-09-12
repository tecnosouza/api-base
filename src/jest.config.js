module.exports = {
    'rootDir': './',
    'setupFilesAfterEnv': [
        './jest.setup.js'
    ],
    'moduleNameMapper': {
        '^@database/(.*)$': '<rootDir>/database/$1',
        '^@controllers/(.*)$': '<rootDir>/controllers/$1',
        '^@dtos/(.*)$': '<rootDir>/dtos/$1',
        '^@helpers/(.*)$': '<rootDir>/helpers/$1',
        '^@middleware/(.*)$': '<rootDir>/middleware/$1',
        '^@models/(.*)$': '<rootDir>/models/$1',
        '^@routes/(.*)$': '<rootDir>/routes/$1',
        '^@scripts/(.*)$': '<rootDir>/scripts/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1'
    }
};
