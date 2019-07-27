import * as THREE from 'three'

export class LightParser {
  light: THREE.Light
  constructor(attrs: any) {
    this.light = new THREE.DirectionalLight(0xffffff)
  }
}