var should = require('chai').should(),
  unedtfy = require('../../dist/unedtfy');

describe('Common - Level 1', function () {
  describe('uncertain/approximate: the parser', function() {
    it('should parse \'YYYY~\'', function() {
      unedtfy.parse('1988?').should.deep.equal({
        uncertain: true,
        year: '1988'
      });
      unedtfy.parse('-1988?').should.deep.equal({
        uncertain: true,
        year: '-1988'
      });
    });
    it('should parse \'YYYY-MM?\'', function() {
      unedtfy.parse('1988-03?').should.deep.equal({
        uncertain: true,
        year: '1988',
        month: '03'
      });
      unedtfy.parse('-1988-03?').should.deep.equal({
        uncertain: true,
        year: '-1988',
        month: '03'
      });
    });
    it('should parse \'YYYY-MM-DD?\'', function() {
      unedtfy.parse('1988-03-28?').should.deep.equal({
        uncertain: true,
        year: '1988',
        month: '03',
        day: '28'
      });
      unedtfy.parse('-1988-03-01?').should.deep.equal({
        uncertain: true,
        year: '-1988',
        month: '03',
        day: '01'
      });
    });
    it('should parse season uncertain', function() {
      unedtfy.parse('1988-24?').should.deep.equal({
        uncertain: true,
        year: '1988',
        season: '24'
      });
      unedtfy.parse('-1988-23?').should.deep.equal({
        uncertain: true,
        year: '-1988',
        season: '23'
      });
    });
    it('should parse \'YYYY~\'', function() {
      unedtfy.parse('1988~').should.deep.equal({
        approximate: true,
        year: '1988'
      });
      unedtfy.parse('-1988~').should.deep.equal({
        approximate: true,
        year: '-1988'
      });
    });
    it('should parse \'YYYY-MM~\'', function() {
      unedtfy.parse('1988-03~').should.deep.equal({
        approximate: true,
        year: '1988',
        month: '03'
      });
      unedtfy.parse('-1988-03~').should.deep.equal({
        approximate: true,
        year: '-1988',
        month: '03'
      });
    });
    it('should parse \'YYYY-MM-DD~\'', function() {
      unedtfy.parse('1988-03-28~').should.deep.equal({
        approximate: true,
        year: '1988',
        month: '03',
        day: '28'
      });
      unedtfy.parse('-1988-03-01~').should.deep.equal({
        approximate: true,
        year: '-1988',
        month: '03',
        day: '01'
      });
    });
    it('should parse season approximate', function() {
      unedtfy.parse('1988-24~').should.deep.equal({
        approximate: true,
        year: '1988',
        season: '24'
      });
      unedtfy.parse('-1988-23~').should.deep.equal({
        approximate: true,
        year: '-1988',
        season: '23'
      });
    });
    it('should parse \'YYYY?~\'', function() {
      unedtfy.parse('1988?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '1988'
      });
      unedtfy.parse('-1988?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '-1988'
      });
    });
    it('should parse \'YYYY-MM?~\'', function() {
      unedtfy.parse('1988-03?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '1988',
        month: '03'
      });
      unedtfy.parse('-1988-03?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '-1988',
        month: '03'
      });
    });
    it('should parse \'YYYY-MM-DD?~\'', function() {
      unedtfy.parse('1988-03-28?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '1988',
        month: '03',
        day: '28'
      });
      unedtfy.parse('-1988-03-01?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '-1988',
        month: '03',
        day: '01'
      });
    });
    it('should parse season approximate', function() {
      unedtfy.parse('1988-24?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '1988',
        season: '24'
      });
      unedtfy.parse('-1988-23?~').should.deep.equal({
        approximate: true,
        uncertain: true,
        year: '-1988',
        season: '23'
      });
    });
  });
  describe('unspecified: the parser', function() {
    it('should parse year unspecified', function() {
      unedtfy.parse('198u').should.deep.equal({year: '198u'});
      unedtfy.parse('19uu').should.deep.equal({year: '19uu'});
    });
    it('should parse month unspecified', function() {
      unedtfy.parse('1988-1u').should.deep.equal({
        year: '1988',
        month: '1u'
      });
      unedtfy.parse('1988-uu').should.deep.equal({
        year: '1988',
        month: 'uu'
      });
    });
    it('should parse day unspecified', function() {
      unedtfy.parse('1988-01-1u').should.deep.equal({
        year: '1988',
        month: '01',
        day: '1u'
      });
      unedtfy.parse('1988-01-uu').should.deep.equal({
        year: '1988',
        month: '01',
        day: 'uu'
      });
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      unedtfy.parse('unknown/1988').should.deep.equal({
        interval: true,
        dates: [{unknown: true}, {year: '1988'}]
      });
      unedtfy.parse('1988/unknown').should.deep.equal({
        interval: true,
        dates: [{year: '1988'}, {unknown: true}]
      });
    });
    it('should parse intervals with open dates', function() {
      unedtfy.parse('open/1988').should.deep.equal({
        interval: true,
        dates: [{open: true}, {year: '1988'}]
      });
    });
    it('should parse various intervals', function() {
      // unedtfy.parse('uu/1988 - around 2005').should.deep.equal('1988-uu/2005~');
      unedtfy.parse('1988-uu/2005~').should.deep.equal({
        interval: true,
        dates: [
          {year: '1988', month: 'uu'},
          {approximate: true, year: '2005'}
        ]
      });
      unedtfy.parse('1988-03/2005-24?').should.deep.equal({
        interval: true,
        dates: [
          {year: '1988', month: '03'},
          {uncertain: true, year: '2005', season: '24'}
        ]
      });
      unedtfy.parse('1988-09-10?~/unknown').should.deep.equal({
        interval: true,
        dates: [
          {uncertain: true, approximate: true, year: '1988', month: '09', day: '10'},
          {unknown: true}
        ]
      });
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handthe them', function() {
      unedtfy.parse('y21988').should.deep.equal({year: '21988'});
      unedtfy.parse('y-21988').should.deep.equal({year: '-21988'});
      unedtfy.parse('y21988-03-03').should.deep.equal({
        year: '21988',
        month: '03',
        day: '03'
      });
      unedtfy.parse('y-21988-03-03').should.deep.equal({
        year: '-21988',
        month: '03',
        day: '03'
      });
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      unedtfy.parse('1988-21').should.deep.equal({
        year: '1988',
        season: '21'
      });
      unedtfy.parse('1988-22').should.deep.equal({
        year: '1988',
        season: '22'
      });
      unedtfy.parse('1988-23').should.deep.equal({
        year: '1988',
        season: '23'
      });
      unedtfy.parse('1988-24').should.deep.equal({
        year: '1988',
        season: '24'
      });
    });
  });
});
