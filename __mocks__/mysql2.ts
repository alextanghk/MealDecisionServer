module.exports = {
    createConnection: jest.fn(() => {
        return {
            connect: jest.fn(),
            query: jest.fn(),
            execute: jest.fn(),
            end: jest.fn()
        }
    }),
    createPool: jest.fn().mockReturnValue({
            connect: jest.fn(),
            query: jest.fn(),
            execute: jest.fn(),
            end: jest.fn(),
            
    })
}