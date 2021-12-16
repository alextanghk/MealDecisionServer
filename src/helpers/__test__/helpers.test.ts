import * as crypto from "crypto";
import { execPath } from "process";
import * as helpers from '../helpers';
jest.mock("crypto")



describe("Helpers test", ()=>{
    const mocked = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValueOnce('testing')
    }

    const mockCrypto = jest.spyOn(crypto, 'createHash')
        
    
    beforeEach(()=>{
        mockCrypto.mockReset().mockImplementationOnce(() => mocked)
    })
    it("Cache key", ()=>{
        const body = { test: "test"}
        const key = helpers.CacheKey(body)
        expect(mockCrypto).toBeCalledTimes(1)
        expect(mockCrypto).toBeCalledWith('md5')
        expect(mocked.update).toBeCalledTimes(1)
        expect(mocked.update).toBeCalledWith(JSON.stringify(body))
        expect(mocked.digest).toBeCalledTimes(1)
        expect(mocked.digest).toBeCalledWith('hex')
        expect(key).toEqual('testing')
    })
})