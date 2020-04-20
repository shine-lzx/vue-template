// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
  // Button类的相关逻辑
  msg(arg) {
    console.log("23333", arg);
  }
}

const Modal = (function() {
  let modal = null;
  return function(msg) {
    if (!modal) {
      modal = document.createElement("div");
      modal.style.position = "relative";
      modal.style.zIndex = "99999";
      modal.innerHTML = msg;
      modal.id = "modal";
      modal.style.display = "none";
      document.body.appendChild(modal);
    }
    return modal;
  };
})();

class Example {
  tip() {
    throw new Error("不可直接调用，需要重写！");
  }
}

class Test extends Example {
  successTip() {
    return new Success();
  }

  failTip() {
    return new Fail();
  }

  static getInstance() {
    if (!Test.instance) {
      Test.instance = new Test();
    }
    return Test.instance;
  }
}

class SuccessAndError {
  promptMessage() {
    throw new Error("不可直接调用，需要重写！");
  }
}

class Success extends SuccessAndError {
  promptMessage() {
    const modal = new Modal("此处信息怎么传入？");
    modal.style.display = "block";
  }
}

class Fail extends SuccessAndError {
  promptMessage() {
    const modal = new Modal("此处错误信息怎么传入？");
    modal.style.display = "block";
  }
}

// --------------------------装饰器
// function prits(target) {
//   target.shine = "lzx";
//   return target;
// }

function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function() {
    console.log("我是Func的装饰器逻辑");
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
}

// @prits
class Father {
  @funcDecorator
  msg() {
    return "6666666";
  }
}

export { Button, Test, Father };
