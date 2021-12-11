module.exports = {
    createConnection: jest.fn().mockResolvedValue({
            connect: jest.fn(),
            query: jest.fn(),
            execute: jest.fn(),
            end: jest.fn()
    }),
    createPool: jest.fn().mockResolvedValue({
            connect: jest.fn(),
            query: jest.fn(),
            execute: jest.fn().mockResolvedValue([[],null]),
            end: jest.fn(),
    })
}