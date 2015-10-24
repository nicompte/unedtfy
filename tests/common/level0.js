var should = require('chai').should(),
  unedtfy = require('../../dist/unedtfy');

describe('Common - Level 0', function () {
  describe('date: the parser', function() {
    it('should parse \'YYYY\' dates', function() {
      unedtfy.parse('1988').should.deep.equal({year: '1988'});
      unedtfy.parse('-1988').should.deep.equal({year:'-1988'});
    });
    it('should parse \'YYYY-MM\' dates', function() {
      unedtfy.parse('1988-01').should.deep.equal({year: '1988', month: '01'});
      unedtfy.parse('1988-02').should.deep.equal({year: '1988', month: '02'});
      unedtfy.parse('1988-03').should.deep.equal({year: '1988', month: '03'});
      unedtfy.parse('1988-04').should.deep.equal({year: '1988', month: '04'});
      unedtfy.parse('1988-05').should.deep.equal({year: '1988', month: '05'});
      unedtfy.parse('1988-06').should.deep.equal({year: '1988', month: '06'});
      unedtfy.parse('1988-07').should.deep.equal({year: '1988', month: '07'});
      unedtfy.parse('1988-08').should.deep.equal({year: '1988', month: '08'});
      unedtfy.parse('1988-09').should.deep.equal({year: '1988', month: '09'});
      unedtfy.parse('1988-10').should.deep.equal({year: '1988', month: '10'});
      unedtfy.parse('1988-11').should.deep.equal({year: '1988', month: '11'});
      unedtfy.parse('1988-12').should.deep.equal({year: '1988', month: '12'});
    });
     it('should parse \'YYYY-MM-DD\' dates', function() {
      unedtfy.parse('1988-02-01').should.deep.equal({year: '1988', month: '02', day: '01'});
      unedtfy.parse('1988-01-12').should.deep.equal({year: '1988', month: '01', day: '12'});
    });
    xit('should not parse invalid dates', function() {
      (function(){unedtfy.parse('1988-01-32')}).should.throw(Error);
      (function(){unedtfy.parse('1988-01-00')}).should.throw(Error);
      (function(){unedtfy.parse('1988-02-30')}).should.throw(Error);
      (function(){unedtfy.parse('1988-04-31')}).should.throw(Error);
      (function(){unedtfy.parse('1988-06-31')}).should.throw(Error);
      (function(){unedtfy.parse('1988-09-31')}).should.throw(Error);
      (function(){unedtfy.parse('1988-11-31')}).should.throw(Error);
    });
  });
  describe('interval: the parser', function() {
    // Between ... and ...
    it('should parse \'YYYY/YYYY\'', function () {
      unedtfy.parse('1987/1988').should.deep.equal({
        interval: true,
        dates: [{year: '1987'}, {year: '1988'}]
      });
    });
    it('should parse \'YYYY-MM/YYYY-MM\' intervals', function () {
      unedtfy.parse('1987-03/1988-04').should.deep.equal({
        interval: true,
        dates: [{year: '1987', month: '03'}, {year: '1988', month: '04'}]
      });
      unedtfy.parse('-10-01/15-03').should.deep.equal({
        interval: true,
        dates: [{year: '-10', month: '01'}, {year: '15', month: '03'}]
      });
    });
    it('should parse \'YYYY-MM-DD/YYYY-MM-DD\'', function () {
     unedtfy.parse('1987-03-03/1988-04-22').should.deep.equal({
        interval: true,
        dates: [{year: '1987', month: '03', day: '03'}, {year: '1988', month: '04', day: '22'}]
      });
      unedtfy.parse('-10-01-31/15-03-02').should.deep.equal({
        interval: true,
        dates: [{year: '-10', month: '01', day: '31'}, {year: '15', month: '03', day: '02'}]
      });
    });
    // Various
    it('should parse various combinations', function () {
      unedtfy.parse('1987/1988-04-22').should.deep.equal({
        interval: true,
        dates: [{year: '1987'}, {year: '1988', month: '04', day: '22'}]
      });
      unedtfy.parse('-10-01-31/15').should.deep.equal({
        interval: true,
        dates: [{year: '-10', month: '01', day: '31'}, {year: '15'}]
      });
      unedtfy.parse('1980-01/1981-10-10').should.deep.equal({
        interval: true,
        dates: [{year: '1980', month: '01'}, {year: '1981', month: '10', day: '10'}]
      });
    });
  });
});
