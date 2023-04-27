const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productService = require('../../../src/services/productService');
const productModel = require('../../../src/models/productModel');
const { products, singleProduct } = require('../models/productMock.model');

describe('Product Service tests', function () {
  afterEach(sinon.restore);
  
  it('GetAll', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves([products]);
    
    const result = await productService.getAllProducts();
    expect(result.message).to.be.an('array');
    expect(result.message).to.have.length(1);
  });
  
  it('GetId', async function () {
    sinon.stub(productModel, 'getProductById').resolves([singleProduct]);
    
    const result = await productService.getProductById(1);
    expect(result.message).to.be.an('array');
  });
  
  it('GetId without id', async function () {
    sinon.stub(productModel, 'getProductById')
      .resolves({ type: 404, message: 'Product not found' });
    const result = await productService.getProductById('xablau');
    expect(result.type).to.equal(null);
    expect(result.message.type).to.equal(404);
    expect(result.message.message).to.equal('Product not found');
  });
});
