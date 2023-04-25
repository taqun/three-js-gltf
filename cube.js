import * as THREE from "three";
import * as TWEEN from "tween.js";

const SPREAD_RANGE = 6;
const SPREAD_ANGLE = 360;

const DURATION = 800;
const EASING = TWEEN.Easing.Quartic.Out;

export class Cube {
  constructor(obj) {
    this.obj = obj;

    this.originPos = this.obj.position.clone();
    this.toPos = new THREE.Vector3(
      Math.random() * SPREAD_RANGE * 2 - SPREAD_RANGE,
      Math.random() * SPREAD_RANGE,
      Math.random() * SPREAD_RANGE * 2 - SPREAD_RANGE
    );
    this.obj.position.copy(this.toPos);

    this.toRotX = Math.random() * SPREAD_ANGLE * (Math.PI / 180);
    this.toRotY = Math.random() * SPREAD_ANGLE * (Math.PI / 180);
    this.obj.rotation.set(this.toRotX, this.toRotY, 0);
  }

  spread() {
    let props = {
      x: this.obj.position.x,
      y: this.obj.position.y,
      z: this.obj.position.z,
      rotX: this.obj.rotation.x,
      rotY: this.obj.rotation.y,
    };

    var tween = new TWEEN.Tween(props)
      .to(
        {
          x: this.toPos.x,
          y: this.toPos.y,
          z: this.toPos.z,
          rotX: this.toRotX,
          rotY: this.toRotY,
        },
        DURATION
      )
      .easing(EASING)
      .onUpdate(() => {
        this.obj.position.set(props.x, props.y, props.z);
        this.obj.rotation.x = props.rotX;
        this.obj.rotation.y = props.rotY;
      });
    tween.start();
  }

  fit() {
    let props = {
      x: this.obj.position.x,
      y: this.obj.position.y,
      z: this.obj.position.z,
      rotX: this.obj.rotation.x,
      rotY: this.obj.rotation.y,
    };

    var tween = new TWEEN.Tween(props)
      .to(
        {
          x: this.originPos.x,
          y: this.originPos.y,
          z: this.originPos.z,
          rotX: 0,
          rotY: 0,
        },
        DURATION
      )
      .easing(EASING)
      .onUpdate(() => {
        this.obj.position.set(props.x, props.y, props.z);
        this.obj.rotation.x = props.rotX;
        this.obj.rotation.y = props.rotY;
      });
    tween.start();
  }
}
