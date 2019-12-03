const request = require('supertest');
const server = require('../../../src/index');

describe('/holes', () => {
  describe('GET /', () => {
    const id = "hole001";      
    const exec = query =>
      request(server)
        .get(`/v1/holes${query ? `/${query}` : ''}`);   

    it('should return all drill holes data', async () => {
      const res = await exec();    
      expect(res.status).toBe(200); 
      expect(res.body.documents.length).toBe(3);    
    });
    it('should return 1 drill hole with search holeId', async () => {
      const res = await exec(id);           
      expect(res.status).toBe(200);        
    });

  });
});
