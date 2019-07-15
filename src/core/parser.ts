import THREE from 'three'
import { TAGS } from './constants'
import { GeometryParser } from './geometry'

export function parse(template: String) {
  let scene: THREE.Scene
  let camera: THREE.Camera
  let renderer: THREE.Renderer
  let groups = []
  let lights = []
  let materials = []
  let geometries: Array<GeometryParser> = []
  let beginRender = false
  let beginScene = false
  let beginCamera = false
  let beginLights = false
  let beginDefine = false
  let beginGroup = false
  let group: Array<GeometryParser>
  require('htmlparser2').Parser(template, {
    onopentag: async function (name: String, attrs: any) {
      switch (name) {
        case TAGS.RENDER:
          beginRender = true
          break
        case TAGS.SCENE:
          if (beginRender) {
            beginScene = true
            scene = new THREE.Scene()
          }
          break
        case TAGS.CAMERA:
          if (beginRender) {
            beginScene = true
            const { fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0, far = 1000 } = attrs
            camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
          }
          break
        case TAGS.DEFINE:
          if (beginRender) {
            beginDefine = true
          }
          break
        case TAGS.GROUP:
          if (beginScene) {
            beginGroup = true
            group = []
            groups.push(group)
          }
          break
        default:
          switch (name) {
            case TAGS.BOX:
            case TAGS.SPHERE:
              let geometryObj = new GeometryParser(name, attrs)
              if (beginGroup) {
                group.push(geometryObj)
              } else if (beginScene) {
                geometries.push(geometryObj)
              }
              break
          }
      }
    },
    onclosetag: function (name: String) {
      switch (name) {
        case TAGS.RENDER:
          beginRender = false
          break
        case TAGS.SCENE:
          beginScene = false
          break
        case TAGS.CAMERA:
          beginCamera = false
          break
        case TAGS.GROUP:
          beginGroup = false
          break
        case TAGS.DEFINE:
          beginDefine = false
          break
      }
    }
  })
}

export class Block3dParser {
  template: String
  constructor(template: String) {
    this.template = template
  }
}