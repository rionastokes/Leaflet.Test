(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Run: npm run test-web

// A quick and dirty abomination to partially run the unit tests inside an
// actual browser by simulating some of the Jest API.

const Jester = (window.Jester = {
  exclude: [],
  state: {
    describe: {},
    unit: {},
    fail: {},
  },
})

// Ensure keys are sorted when JSONified.
function stringify(o) {
  if (null === o) return 'null'
  if ('symbol' === typeof o) return String(o)
  if ('object' !== typeof o) return '' + o
  return JSON.stringify(
    Object.keys(o)
      .sort()
      .reduce((a, k) => ((a[k] = o[k]), a), {}),
    stringify
  ) // Recusively!
}

function print(s) {
  let test = document.getElementById('test')
  test.innerHTML = test.innerHTML + s + '<br>'
}

window.describe = function (name, tests) {
  Jester.state.describe = { name }
  tests()
}
window.test = function (name, unit) {
  if (Jester.exclude.includes(name)) return

  try {
    Jester.state.unit = { name }
    unit()
    // console.log('PASS:', name)
    print('PASS: ' + name)
  } catch (e) {
    console.log(e)
    print('FAIL: ' + name)
    print(e.message + '<br><pre>' + e.stack + '</pre>')
  }
}
window.expect = function (sval) {
  function pass(cval, ok) {
    // console.log('pass',cval,ok)
    if (!ok) {
      let state = Jester.state
      state.fail.found = sval
      state.fail.expected = cval
      let err = new Error(
        'FAIL: ' + state.describe.name + ' ' + state.unit.name
      )
      throw err
    }
  }

  function passEqualJSON(cval) {
    let sjson = stringify(sval)
    let cjson = stringify(cval)

    let ok = sjson === cjson
    pass(cval, ok)
  }

  return {
    toEqual: (cval) => {
      passEqualJSON(cval)
    },
    toBeTruthy: (cval) => pass(cval, !!cval),
    toBeFalsy: (cval) => pass(cval, !cval),
    toBeDefined: (cval) => pass(cval, undefined !== sval),
    toBeUndefined: (cval) => pass(cval, undefined === sval),
    toMatch: (cval) => pass(cval, sval.match(cval)),
    toThrow: (cval) => {
      try {
        sval()
        pass(cval, false)
      } catch (e) {
        pass(cval, true)
      }
    },
    toMatchObject: (cval) => {
      passEqualJSON(cval)
    },
  }
}

require('./leaflet-test.test.js')

},{"./leaflet-test.test.js":2}],2:[function(require,module,exports){
let LeafletModule = require('../src/leaflet-test')
const Leaflet = LeafletModule

describe('leaflet', () => {
  test('happy', () => {
    expect(Leaflet()).toBeDefined()
  })
})

},{"../src/leaflet-test":3}],3:[function(require,module,exports){

},{}]},{},[1]);
