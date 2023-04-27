const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productModel = require('../../../src/models/productModel');
const connection = require('../../../src/models/connection');
const { products, singleProduct, resultInsert, productName } = require('./productMock.model');

describe('Tests model layer', function () {
  describe('Get Product Model tests', function () {
    afterEach(sinon.restore);

    it('GetAll', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productModel.getAllProducts();
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
    });

    it('GetId', async function () {
      sinon.stub(connection, 'execute').resolves([singleProduct]);

      const result = await productModel.getProductById(1);
      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['id', 'name']);
    });
  });

  // describe('Register product Model tests', function () {
  //   afterEach(sinon.restore);

  //   it('GetAll', async function () {
  //     sinon.stub(connection, 'execute').resolves(resultInsert);

  //     const result = await productModel.insertProduct(productName);
  //     expect(result).to.be.an('array');
  //     expect(result).to.have.length(2);
  //     expect(result[0].affectedRows).to.equal(1);
  //     expect(result[0].insertId).to.equal(2);
  //     // expect(result[0].affectedRows).to.be(1);
  //     // expect(result[0].insertId).to.be(2);
  //   });
  // });
});