const { expect } = require('chai');
const sinon = require('sinon');
const matrix = require('../matrix.js');
const { gauss_forward, gauss_backward, gauss } = require('../gauss_functions.js');
const lib = require('../gauss_functions.js');
describe('gauss_forward test', () => {
  it('should perform the Gauss forward substitution', () => {
    const _matrix = new matrix();
    const mock = sinon.mock(_matrix);
    mock.expects('get_rows').once().returns(3);
    mock.expects('get_cols').once().returns(3);
    mock.expects('get').exactly(8).returns(1);
    mock.expects('mull_add').exactly(3);
    mock.expects('swap_with_nonzero_row').never();

    gauss_forward(_matrix);
    mock.verify();
  });

  it('should call swap_with_nonzero_row when get returns zero', () => {
    const _matrix = new matrix();
    const mock = sinon.mock(_matrix);

    mock.expects('get_rows').once().returns(3);
    mock.expects('get_cols').once().returns(3);
    mock.expects('get').exactly(2).returns(0);
    mock.expects('mull_add').never();
    mock.expects('swap_with_nonzero_row').exactly(2);

    gauss_forward(_matrix);
    mock.verify();
  });

});

describe('gauss_backward test', () => {
  it('should perform the Gauss backward substitution and calculate solutions', () => {
    const _matrix = new matrix();
    const mock = sinon.mock(_matrix);

    mock.expects('get_rows').once().returns(3);
    mock.expects('get_cols').once().returns(3);
    mock.expects('get').exactly(7).returns(1);

    const solutions = gauss_backward(_matrix);
    expect(solutions).to.be.an('array').that.does.not.include(Infinity);

    mock.verify();
  });
});

describe('gauss test', () => {
  it('should perform Gauss elimination and return solutions when no wrong or zero rows', () => {
    const _matrix = new matrix();
    const mock = sinon.mock(_matrix);

    const gaussLibMock = sinon.mock(lib);
    gaussLibMock.expects('gauss_forward').once();
    gaussLibMock.expects('gauss_backward').once();

    mock.expects('get_rows').atLeast(1).returns(3);
    mock.expects('get_cols').atLeast(1).returns(3);
    mock.expects('get').atLeast(1).returns(1);
    mock.expects('exists_wrong_row').once().returns(false);
    mock.expects('mull_add').exactly(3);
    mock.expects('exists_zero_row').once().returns(false);

    const solutions = gauss(_matrix);
    expect(solutions).to.be.an('array').that.does.not.include(Infinity);

    mock.verify();
  });

  it('should return null when there is wrong or zero row after gauss_forward', () => {
    const _matrix = new matrix();
    const mock = sinon.mock(_matrix);

    mock.expects('exists_wrong_row').once().returns(true);

    const result = gauss(_matrix);
    expect(result).to.be.null;

    mock.verify();
  });
});