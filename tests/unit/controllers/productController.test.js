const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productController = require('../../../src/controllers/productController');
const productService = require('../../../src/services/productService');
const { products, singleProduct } = require('../models/productMock.model');

describe('Product Service tests', function () {
  afterEach(sinon.restore);

  it('GetAll', async function () {
    sinon.stub(productService, 'getAllProducts').resolves([products]);

    const result = await productController.getAllProducts();
    console.log('result no controller', result);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.an('object');
  });
  
  it('GetId', async function () {
    sinon.stub(productService, 'getProductById').resolves([singleProduct]);
    
    const result = await productController.getProductById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.an('object');
    expect(result.message).to.contain.keys(['id', 'name']);
  });

  it('GetId without id', async function () {
    sinon.stub(productService, 'getProductById')
      .resolves({ type: 404, message: 'Product not found' });

    const result = await productController.getProductById('xablau');
    expect(result.type).to.equal(404);
    expect(result.message.type).to.equal(404);
    expect(result.message.message).to.equal('Product not found');
  });
});
