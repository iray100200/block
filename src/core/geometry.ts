import THREE from 'three'

export class GeometryParser {
  geometry: THREE.Geometry
  constructor(name: String, attrs: any) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }
}