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
    onopentag: function (name, atttrs) {
      switch (name) {
        case TAGS.RENDER:
          break
        case TAGS.SCENE:
          break
        case TAGS.CAMERA:
          break
      }
    },
    onclosetag: function (name) {

    }
  })
}

class Block3dParser {
  constructor(private template: String) {
    this.template = template
  }
}