import * as THREE from 'three'
import { TAGS } from './constants'
import { GeometryParser } from './geometry'
import { MaterialParser } from './material'
import { LightParser } from './light'

const HTMLParser = require("htmlparser2")

function parse(template: String, container: HTMLElement) {
  let scene: THREE.Scene
  let camera: THREE.Camera
  let renderer: THREE.Renderer
  let groups = []
  let lights = []
  let materials: Array<MaterialParser> = []
  let geometries: Array<GeometryParser> = []
  let beginRender = false
  let beginScene = false
  let beginLights = false
  let beginDefine = false
  let beginGroup = false
  let group: Array<GeometryParser>
  const parser = new HTMLParser.Parser({
    onopentag: async function (name: String, attrs: any) {
      switch (name) {
        case TAGS.RENDER:
          beginRender = true
          renderer = new THREE.WebGLRenderer()
          renderer.render(scene, camera)
          container.appendChild(renderer.domElement)
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
        case TAGS.LIGHTS:
          beginLights = true
          break
        case TAGS.LIGHT:
          if (beginLights) {
            const light = new LightParser(attrs)
            lights.push(light)
          }
        case TAGS.MATERIAL:
          if (beginDefine) {
            const material = new MaterialParser(attrs)
            materials.push(material)
          }
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
        case TAGS.GROUP:
          beginGroup = false
          break
        case TAGS.DEFINE:
          beginDefine = false
          break
        case TAGS.LIGHTS:
          beginLights = false
          break
      }
    }
  })
  parser.write(template)
  parser.end()
}

export class Block3d {
  container: HTMLElement
  static render(node: HTMLElement | null) {
    if (node === null) return
    let container = node.parentElement
    if (container === null) return
    parse(node.innerHTML, container)
  }
  constructor(node: HTMLElement | null) {

  }
}