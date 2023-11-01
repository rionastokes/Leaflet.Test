let Leaflet = require('../src/leaflet')
require('./leaflet-plugin/L.WatermarkControl')

describe('leaflet', () => {
  test('happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('map', () => {
    let map = L.map(document.createElement('div'))
    expect(map).toBeDefined()
  })

  test('custom-plugin-watermark', () => {
    let map = L.map(document.createElement('div'))
    let watermark = L.control.watermark()
    watermark.addTo(map)
    let wmcontainer = watermark.getContainer()
    expect(wmcontainer).toBeDefined()
  })
})
