import THREE from 'three'

export class MaterialParser {
  material: THREE.Material
  constructor(attrs: any) {
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  }
}