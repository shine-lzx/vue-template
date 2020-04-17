class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS () {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
  // 提供硬件的接口
  createHardWare () {
    throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
  }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
  createOS () {
    // 提供安卓系统实例
    return new AndroidOS()
  }
  createHardWare () {
    // 提供高通硬件实例
    return new QualcommHardWare()
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare () {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare () {
    console.log('我会用安卓的方式去操作硬件')
  }
}

class AppleOS extends OS {
  controlHardWare () {
    console.log('我会用🍎的方式去操作硬件')
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder () {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder () {
    console.log('我会用高通的方式去运转')
  }
}

class MiWare extends HardWare {
  operateByOrder () {
    console.log('我会用小米的方式去运转')
  }
}


// 新的手机
class newFakeStarFactory extends MobilePhoneFactory {
  createOS () {
    // 提供苹果系统实例
    return new AppleOS()
  }
  createHardWare () {
    // 提供小米硬件实例
    return new MiWare()
  }
}

export {
  FakeStarFactory,
  newFakeStarFactory
}

/**添加新产品时，除了增加新产品类外，还要提供与之对应的具体工厂类，系统类的个数将成对增加，系统更为繁琐复杂。
虽然保证了工厂方法内的对外修改关闭，
但对于使用工厂方法的类，如果要更换另外一种产品，
仍然需要修改实例化的具体工厂类，
比如在本例中不是生产疫苗，而是生产食品，
则需要添加食品工厂。
 */