let LeafletModule = require('../src/leaflet-test')
const Leaflet = LeafletModule

describe('leaflet', () => {
  test('happy', () => {
    expect(Leaflet()).toBeDefined()
  })
})
