var should = require('chai').should(),
  unedtfy = require('../../dist/unedtfy');

describe('Common - Level 2', function () {
  describe('partial unspecified: the parser', function() {
    it('should parse various combinations', function() {
      unedtfy.parse('198u-11-uu').should.deep.equal({year: '198u', month: '11', day: 'uu'});
      unedtfy.parse('1988-0u-1u').should.deep.equal({year: '1988', month: '0u', day: '1u'});
      unedtfy.parse('19uu-1u-0u').should.deep.equal({year: '19uu', month: '1u', day: '0u'});
      unedtfy.parse('19uu-1u-uu').should.deep.equal({year: '19uu', month: '1u', day: 'uu'});
      unedtfy.parse('19uu-uu-uu').should.deep.equal({year: '19uu', month: 'uu', day: 'uu'});
      unedtfy.parse('uu-uu-uu').should.deep.equal({year: 'uu', month: 'uu', day: 'uu'});
    });
  });
  describe('one of a set: the parser', function() {
    it('should parse simple set', function() {
      unedtfy.parse('[2014-03-01,2015-04-02]').should.deep.equal({
        set: true,
        dates: [
          {year: '2014', month: '03', day: '01'},
          {year: '2015', month: '04', day: '02'}
        ]
      });
      unedtfy.parse('[2011,2012]').should.deep.equal({
        set: true,
        dates: [
          {year: '2011'},
          {year: '2012'}
        ]
      });
      unedtfy.parse('[2011-03,2012]').should.deep.equal({
        set: true,
        dates: [
          {year: '2011', month: '03'},
          {year: '2012'}
        ]
      });
    });
    it('should parse multiple set', function() {
      unedtfy.parse('[2014-03-01,2015-04-02,2016-06-20]').should.deep.equal({
        set: true,
        dates: [
          {year: '2014', month: '03', day: '01'},
          {year: '2015', month: '04', day: '02'},
          {year: '2016', month: '06', day: '20'}
        ]
      });
      unedtfy.parse('[2011,2012,2013]').should.deep.equal({
        set: true,
        dates: [
          {year: '2011'},
          {year: '2012'},
          {year: '2013'}
        ]
      });
      unedtfy.parse('[2011-03,2012,2013-22]').should.deep.equal({
        set: true,
        dates: [
          {year: '2011', month: '03'},
          {year: '2012'},
          {year: '2013', season: '22'}
        ]
      });
    });
  });
  describe('multiple dates: the parser', function() {
    it('should parse simple set', function() {
      unedtfy.parse('{2014-03-01,2015-04-02}').should.deep.equal({
        multiple: true,
        dates: [
          {year: '2014', month: '03', day: '01'},
          {year: '2015', month: '04', day: '02'}
        ]
      });
      unedtfy.parse('{2011,2012}').should.deep.equal({
        multiple: true,
        dates: [
          {year: '2011'},
          {year: '2012'}
        ]
      });
      unedtfy.parse('{2011-03,2012}').should.deep.equal({
        multiple: true,
        dates: [
          {year: '2011', month: '03'},
          {year: '2012'}
        ]
      });
    });
    it('should parse multiple set', function() {
      unedtfy.parse('{2014-03-01,2015-04-02,2016-06-20}').should.deep.equal({
        multiple: true,
        dates: [
          {year: '2014', month: '03', day: '01'},
          {year: '2015', month: '04', day: '02'},
          {year: '2016', month: '06', day: '20'}
        ]
      });
      unedtfy.parse('{2011,2012,2013}').should.deep.equal({
        multiple: true,
        dates: [
          {year: '2011'},
          {year: '2012'},
          {year: '2013'}
        ]
      });
      unedtfy.parse('{2011-03,2012,2013-22}').should.deep.equal({
        multiple: true,
        dates: [
          {year: '2011', month: '03'},
          {year: '2012'},
          {year: '2013', season: '22'}
        ]
      });
    });
  });
});
