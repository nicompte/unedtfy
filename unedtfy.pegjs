
start
  = interval
  / multiple
  / set
  / approximate_or_undertain
  / date

interval = d1:comp '/' d2:comp {
  return {
    interval: true,
    dates: [d1, d2]
  }
}

set = '[' d1:comp d2:(',' d:comp{return d})+ ']' {
  return{
    set: true,
    dates: [d1].concat(d2)
  }
}

multiple = '{' d1:comp d2:(',' d:comp{return d})+ '}' {
  return{
    multiple: true,
    dates: [d1].concat(d2)
  }
}

comp
  = approximate_or_undertain
  / date

approximate_or_undertain
  = d:date u:'?'? a:'~'? {
  var answer = d
  if (u) answer.uncertain = true
  if (a) answer.approximate = true
  return answer
}

date
  = open
  / unknown
  / year_month_day
  / year_season
  / year_month
  / y:year {return {year: y}}

year_month_day = y:year '-' m:month '-' d:day{
  return {year: y, month: m, day: d}
}
year_month = y:year '-' m:month{
  return {year: y, month: m}
}
year_season = y:year '-' s:season{
  return {year: y, season: s}
}

year = 'y'? a:('-'? yeardigits) {return a.join('')}

yeardigits = $(d:(DIGIT+ / !'/') u:(UNKNOWN* / !'/'))

season
 = $('21' / '22' / '23' / '24')

month
  = $(UNKNOWN_MONTH UNKNOWN / UNKNOWN_MONTH DIGIT)
  / d:DIGIT {return '0' + d}
  / 'u' {return 'uu'}
  / 'x' {return 'xx'}
day
  = $(UNKNOWN_DAY UNKNOWN / UNKNOWN_DAY DIGIT)
  / d:DIGIT {return '0' + d}
  / 'u' {return 'uu'}
  / 'x' {return 'xx'}

open = 'open' {return {open: true}}

unknown = 'unknown' {return {unknown: true}}

DIGIT = [0-9]
UNKNOWN = 'u' / 'x'
UNKNOWN_MONTH = UNKNOWN / [0-1]
UNKNOWN_DAY = UNKNOWN / [0-3]