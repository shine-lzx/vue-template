class singleton {
  show () {
    console.log('我是一个单例对象')
  }

  static getInstance () {
    // 判断是否已经new过1个实例
    console.log('singleton.instance', singleton.instance)
    if (!singleton.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      singleton.instance = new singleton()
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return singleton.instance
  }
}

export {
  singleton
}