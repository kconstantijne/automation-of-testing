const expect = require('chai').expect;
const Mtrx = require('mtrx');
describe('operations', function() {
    it('should add two matrices', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = new Mtrx([[5, 6], [7, 8]]);
        const m3 = m1.add(m2);
        expect(m3.rows).to.equal(2);
        expect(m3.cols).to.equal(2);
        expect(m3[0][0]).to.equal(6);
        expect(m3[0][1]).to.equal(8);
        expect(m3[1][0]).to.equal(10);
        expect(m3[1][1]).to.equal(12);
    });
    it('should not add two matrices with different sizes', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = new Mtrx([[5, 6, 7], [8, 9, 10]]);
        expect(() => m1.add(m2)).to.throw();
    });
    it('should subtract two matrices', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = new Mtrx([[5, 6], [7, 8]]);
        const m3 = m1.sub(m2);
        expect(m3.rows).to.equal(2);
        expect(m3.cols).to.equal(2);
        expect(m3[0][0]).to.equal(-4);
        expect(m3[0][1]).to.equal(-4);
        expect(m3[1][0]).to.equal(-4);
        expect(m3[1][1]).to.equal(-4);
    });
    it('should not subtract two matrices with different sizes', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = new Mtrx([[5, 6, 7], [8, 9, 10]]);
        expect(() => m1.sub(m2)).to.throw();
    });
    it('should multiply two matrices', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = new Mtrx([[5, 6], [7, 8]]);
        const m3 = m1.mul(m2);
        expect(m3.rows).to.equal(2);
        expect(m3.cols).to.equal(2);
        expect(m3[0][0]).to.equal(19);
        expect(m3[0][1]).to.equal(22);
        expect(m3[1][0]).to.equal(43);
        expect(m3[1][1]).to.equal(50);
    });
    it('should not multiply two matrices with wrong sizes', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = new Mtrx([[5, 6, 7], [8, 9, 10], [11, 12, 13]]);
        expect(() => m1.mul(m2)).to.throw();
    });
    it('should multiply matrix by scalar', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = m1.mul(2);
        expect(m2.rows).to.equal(2);
        expect(m2.cols).to.equal(2);
        expect(m2[0][0]).to.equal(2);
        expect(m2[0][1]).to.equal(4);
        expect(m2[1][0]).to.equal(6);
        expect(m2[1][1]).to.equal(8);
    });
    it('should divide matrix by scalar', function() {
        const m1 = new Mtrx([[2, 4], [6, 8]]);
        const m2 = m1.div(2);
        expect(m2.rows).to.equal(2);
        expect(m2.cols).to.equal(2);
        expect(m2[0][0]).to.equal(1);
        expect(m2[0][1]).to.equal(2);
        expect(m2[1][0]).to.equal(3);
        expect(m2[1][1]).to.equal(4);
    });
    it('should transpose matrix', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = m1.T();
        expect(m2.rows).to.equal(2);
        expect(m2.cols).to.equal(2);
        expect(m2[0][0]).to.equal(1);
        expect(m2[0][1]).to.equal(3);
        expect(m2[1][0]).to.equal(2);
        expect(m2[1][1]).to.equal(4);
    });
    it('should inverse matrix', function() {
        const m1 = new Mtrx([[1, 2], [3, 4]]);
        const m2 = m1.inv();
        expect(m2.rows).to.equal(2);
        expect(m2.cols).to.equal(2);
        expect(Number(m2[0][0].toFixed(0))).to.equal(-2);
        expect(m2[0][1]).to.equal(1);
        expect(Number(m2[1][0].toFixed(2))).to.equal(1.5);
        expect(Number(m2[1][1].toFixed(2))).to.equal(-0.5);
    });
    it('should not inverse non-square matrix', function() {
        const m1 = new Mtrx([[1, 2, 3], [4, 5, 6]]);
        expect(() => m1.inv()).to.throw();
    });
    it('should not inverse singular matrix', function() {
        const m1 = new Mtrx([[1, 2], [2, 4]]);
        expect(() => m1.inv()).to.throw();
    });
    it('should get LUP decomposition', function() {
        const m1 = new Mtrx([
            [1, 2, 0],
            [3, 4, 4],
            [5, 6, 3]
        ]);
        const { L, U, P } = m1.LUP();
        expect(L.rows).to.equal(3);
        expect(L.cols).to.equal(3);
        expect(L[0][0]).to.equal(1);
        expect(L[0][1]).to.equal(0);
        expect(L[0][2]).to.equal(0);
        expect(L[1][0]).to.equal(0.2);
        expect(L[1][1]).to.equal(1);
        expect(L[1][2]).to.equal(0);
        expect(L[2][0]).to.equal(0.6);
        expect(Number(L[2][1].toFixed(1))).to.equal(0.5);
        expect(L[2][2]).to.equal(1);
        expect(U.rows).to.equal(3);
        expect(U.cols).to.equal(3);
        expect(U[0][0]).to.equal(5);
        expect(U[0][1]).to.equal(6);
        expect(U[0][2]).to.equal(3);
        expect(U[1][0]).to.equal(0);
        expect(Number(U[1][1].toFixed(2))).to.equal(0.8);
        expect(Number(U[1][2].toFixed(1))).to.equal(-0.6);
        expect(U[2][0]).to.equal(0);
        expect(U[2][1]).to.equal(0);
        expect(Number(U[2][2].toFixed(1))).to.equal(2.5);
        expect(P.rows).to.equal(3);
        expect(P.cols).to.equal(3);
        expect(P[0][0]).to.equal(0);
        expect(P[0][1]).to.equal(0);
        expect(P[0][2]).to.equal(1);
        expect(P[1][0]).to.equal(1);
        expect(P[1][1]).to.equal(0);
        expect(P[1][2]).to.equal(0);
        expect(P[2][0]).to.equal(0);
        expect(P[2][1]).to.equal(1);
        expect(P[2][2]).to.equal(0);
    });
    it('should get rank of matrix', function() {
        const m1 = new Mtrx([
            [1, 2, 0],
            [3, 4, 4],
            [5, 6, 3]
        ]);
        expect(m1.rank).to.equal(3);
    });
    it('should get determinant of matrix', function() {
        const m1 = new Mtrx([
            [5, 7, 1],
            [-4, 1, 0],
            [2, 0, 3]
        ]);
        expect(m1.det).to.equal(97);
    });
    it('should get cofactor of matrix', function() {
        const m1 = new Mtrx([
            [1, 2, 1],
            [2, 3, 1],
            [1, 1, 2]
        ]);
        const m2 = m1.cof(1, 1);
        expect(m2.rows).to.equal(2);
        expect(m2.cols).to.equal(2);
        expect(m2[0][0]).to.equal(1);
        expect(m2[0][1]).to.equal(1);
        expect(m2[1][0]).to.equal(1);
        expect(m2[1][1]).to.equal(2);
    });
});
