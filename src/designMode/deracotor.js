// 弹框创建逻辑，这里我们复用了单例模式面试题的例子
const Modal = (function() {
  let modal = null;
  return function() {
    if (!modal) {
      modal = document.createElement("div");
      modal.innerHTML = "您还未登录哦~";
      modal.id = "modal";
      modal.style.display = "none";
      document.body.appendChild(modal);
    }
    return modal;
  };
})();

// // 点击打开按钮展示模态框
// document.getElementById("open").addEventListener("click", function() {
//   // 未点击则不创建modal实例，避免不必要的内存占用
//   const modal = new Modal();
//   modal.style.display = "block";
// });

// // 点击关闭按钮隐藏模态框
// document.getElementById("close").addEventListener("click", function() {
//   const modal = document.getElementById("modal");
//   if (modal) {
//     modal.style.display = "none";
//   }
// });

//------------------------------------------新逻辑-----------------------------------
// 将展示Modal的逻辑单独封装
// function openModal() {
//   const modal = new Modal();
//   modal.style.display = "block";
// }

// // 按钮文案修改逻辑
// function changeButtonText() {
//   const btn = document.getElementById("open");
//   btn.innerText = "快去登录";
// }

// // 按钮置灰逻辑
// function disableButton() {
//   const btn = document.getElementById("open");
//   btn.setAttribute("disabled", true);
// }

// // 新版本功能逻辑整合
// function changeButtonStatus() {
//   changeButtonText();
//   disableButton();
// }

// document.getElementById("open").addEventListener("click", function() {
//   openModal();
//   changeButtonStatus();
// });

// ----------------------------------------------es6------------------------------------------
// 定义打开按钮
class OpenButton {
  // 点击后展示弹框（旧逻辑）
  onClick() {
    const modal = new Modal();
    modal.style.display = "block";
  }
}

// 定义按钮对应的装饰器
class Decorator {
  // 将按钮实例传入
  constructor(open_button) {
    this.open_button = open_button;
  }

  onClick() {
    this.open_button.onClick();
    // “包装”了一层新逻辑
    this.changeButtonStatus();
  }

  changeButtonStatus() {
    this.changeButtonText();
    this.disableButton();
  }

  disableButton() {
    const btn = document.getElementById("open");
    btn.setAttribute("disabled", true);
  }

  changeButtonText() {
    const btn = document.getElementById("open");
    btn.innerText = "快去登录";
  }
}

const openButton = new OpenButton();
const decorator = new Decorator(openButton);

document.getElementById("open").addEventListener("click", function() {
  // openButton.onClick()
  // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
  decorator.onClick();
});
