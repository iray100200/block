import HTMLParser from 'htmlparser2'
import THREE from 'three'
import { TAGS } from './constants'

function parse(template: String) {
  let scene = null;
  let camera = null;
  let renderer = null;
  let lights = null;
  let materials = null;
  let shapes = null;
  let beginRender = false;
  let beginScene = false;
  let beginCamera = false;
  let beginLights = false;
  let beginDefine = false;
  let beginGroup = false;
  HTMLParser.Parser(template, {
    onopentag: function (name: String, atttrs: any) {
      switch (name) {
        case TAGS.RENDER:
          beginRender = true
          break
        case TAGS.SCENE:
          if (beginRender) {
            beginScene = true
          }
          break
        case TAGS.CAMERA:
          if (beginRender) {
            beginScene = true
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
          }
          break
      }
    },
    onclosetag: function (name: String) {

    }
  })
}

class Block3dParser {
  constructor(private template: String) {
    this.template = template
  }
}