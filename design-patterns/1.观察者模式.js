
/**
 * 观察者模式：与发布订阅模式不同，它没有一个调度中心
 * 目标和观察者是互相关联的。
 * 1. 观察者需要观察目标
 * 2. 然后目标需要知道当前观察者的数量
 * 
 */

// 目标：被观察者
class Subject {
  constructor() {
    this.observers = []
    this.state = 'how are you'
  }

  setState(state) {
    this.state = state
    this.notify()
  }

  attach(observer) {
    this.observers.push(observer)
  }

  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

// 观察者
class Observer {
  constructor(name, target) {
    this.name = name
    this.target = target
  }

  update() {
    console.log(`${this.name}: ${this.target.state}`)
  }
}

const subject = new Subject()

// 观察者去观察具体的目标
const observer = new Observer('张三', subject)

// 被观察者需要知道观察我的人
subject.attach(observer)

// 当改变state时，订阅者将执行
subject.setState('im fine. and you')