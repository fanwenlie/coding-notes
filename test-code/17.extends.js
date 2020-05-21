/**
 * 实现一个es5继承方法：寄生组合式继承
 *  
 * 寄生组合式继承优点：
 * 1. 解决了原型链继承的问题，即父类的实例的属性和方法会变成子类原型上的属性和方法
 * 2. 解决了call(借用构造函数)继承无法继承父类原型上的属性和方法的问题
 */

function Parent(name) {
  this.name = name
  this.data = [1, 2, 3]
}

Parent.prototype.getName = function () {
  return this.name
}


function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

// function inherits(child, parent) {
//   function Temp() {}
//   Temp.prototype = parent.prototype
//   child.prototype = new Temp()
//   child.prototype.constructor = child
// }
// inherits(Child, Parent)

/**
 * 也可以不用利用空函数来中转的方式实现继承
 * 利用Object.create()
 */
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const c = new Child('fwl', '27')
console.log(c)