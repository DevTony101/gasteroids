class MovableObjects {
  constructor(movementX, movementY, rnd) {
    this.movementX = movementX;
    this.movementY = movementY;
    this.collection = [];
    if (rnd) {
      this.collection = Array(rnd).fill(0).map(_ => {
        const [x, y] = [random(width), random(height)];
        return { x, y };
      });
    }
  }
  
  add(movable) {
    this.collection.push(movable);
  }
  
  deleteByIndex(idx) {
    this.collection.splice(idx, 1);
  }
  
  size() {
    return this.collection.length;
  }
  
  draw(drawFn) {
    for (let i = 0; i < this.collection.length; i++) {
      let { x, y } = this.collection[i];
      push();
      drawFn(x, y);
      pop();
    }
  }
  
  move(condition, shouldResetY) {
    for (let i = 0; i < this.collection.length; i++) {
      let { x, y } = this.collection[i];
      if (condition && condition(x, y)) {
        if (shouldResetY) y = 0;
        else {
          this.collection.splice(i, 1);
          continue;
        }
      }
      x = x + this.movementX;
      y = y + this.movementY;
      this.collection[i] = { x, y };
    }
  }
}