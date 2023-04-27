const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;
const productController = require('../../../src/controllers/productController');
const productService = require('../../../src/services/productService');
const { products, singleProduct } = require('../models/productMock.model');

describe('Product Controller tests', function () {
  afterEach(sinon.restore);

  it('GetAll', async function () {
    sinon.stub(productService, 'getAllProducts').resolves({ type: null, message: [products] });
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([products]);
  });
  
  it('GetId', async function () {
    sinon.stub(productService, 'getProductById').resolves({ type: null, message: [singleProduct] });
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([singleProduct]);
  });

  it('GetId without id', async function () {
    sinon.stub(productService, 'getProductById')
      .resolves({ type: 404, message: 'Product not found' });
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
