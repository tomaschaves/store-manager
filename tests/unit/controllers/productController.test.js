const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productController = require('../../../src/controllers/productController');
const productService = require('../../../src/services/productService');
const { products, singleProduct } = require('../models/productMock.model');

describe('Product Controller tests', function () {
  afterEach(sinon.restore);

  it('GetAll', async function () {
    console.log('controller entrou no getAll');
    sinon.stub(productService, 'getAllProducts').resolves([products]);

    const result = await productController.getAllProducts();
    console.log('result no controller', result);
    // console.log('result no controller', result);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.an('object');
  });
  
  it('GetId', async function () {
    console.log('controller entrou no getId');
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductById').resolves([singleProduct]);

    await productController.getProductById(req, res);

    // expect(result.type).to.equal(null);
    // expect(result.message).to.be.an('object');
    // expect(result.message).to.contain.keys(['id', 'name']);
    // TODO ARRUMAR ESSAS FUNÇÕES
  });

  it('GetId without id', async function () {
    console.log('controller entrou no without id');
    sinon.stub(productService, 'getProductById')
      .resolves({ type: 404, message: 'Product not found' });

    const result = await productController.getProductById('xablau');
    expect(result.type).to.equal(404);
    expect(result.message.type).to.equal(404);
    expect(result.message.message).to.equal('Product not found');
  });
});
