class Example {
  constructor(name, age) {
    //constructor作用是接收传到父类的参数
    this.name = name;
    this.age = age;
  }
  msg() {
    console.log("my name is", this.name, "year", this.age);
  }
}

class Derive extends Example {
  // constructor(name, age) {
  //   super(name, age);
  // }

  reads() {
    console.log('子类', this.name, this.age);
  }
}

export { Example, Derive };
