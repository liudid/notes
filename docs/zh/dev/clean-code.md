### 1.不要在控制流中的提前返回
会被误以为想返回props.beforeImport(uploadFile)的结果
```ts:line-numbers {1}
// bad
const onUploadFileClick = () => {
  if (isHasBeforeImport()) {
    return props.beforeImport(uploadFile);
  }
  uploadFile();
}
```

```ts:line-numbers {1}
// good
const onUploadFileClick = () => {
  if (isHasBeforeImport()) {
    props.beforeImport(uploadFile);
  } else {
    uploadFile();
  }
}
```

### 2.避免那些不应该出现的副作用（Side Effect）
副作用（Side Effect）

它的要求很高，概括的讲，只要是跟函数外部环境发生的交互就都是副作用。

在JS中，我们的目的不是完全消除副作用，而是避免那些不应该出现的副作用。

JS原生的方法中，map就很函数式，他会返回一个新的数组，不会改变原数组。而pop这种方法就很不好，它在操作了数组之后，也改变数组本身。

要想保证函数无副作用这项特性，只能依靠编程人员的习惯，即
1. 函数入口使用参数运算，而不修改它
2. 函数内不修改函数外的变量，如全局变量
3. 运算结果通过函数返回给外部（出口）

纯函数对应的是副作用

```ts:line-numbers {1}
// bad
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
var name = 'Ryan McDermott';

function splitIntoFirstAndLastName() {
  name = name.split(' ');
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
```

```ts:line-numbers {1}
// good
function splitIntoFirstAndLastName(name) {
  return name.split(' ');
}

var name = 'Ryan McDermott'
var newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```

### 3.尽量使用纯函数（Pure Function）
纯函数（Pure Function）

- 此函数在相同的输入值时，需产生相同的输出
- 函数的输出和输入值以外的其他隐藏信息或状态无关，也和由IO设备产生的外部输出无关
- 该函数不能有语义上可观察的函数副作用，例如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等

副作用对应的是纯函数

```ts:line-numbers {1}
// bad
let globalVar = 0;
function updateGlobal(value) {
  globalVar += value;
}
console.log(globalVar); // 输出 0
updateGlobal(5); // 调用具有副作用的函数
console.log(globalVar); // 输出 5，全局变量 globalVar 被修改
```

```ts:line-numbers {1}
// good
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 输出 8
```

### 4.函数功能的单一性
这是软件功能中最重要的原则之一。

功能不单一的函数将导致难以重构、测试和理解。功能单一的函数易于重构，并使代码更加干净。

```ts:line-numbers {1}
// bad
function emailClients(clients) {
  clients.forEach(client => {
    let clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

```ts:line-numbers {1}
// good
function emailClients(clients) {
  clients.forEach(client => {
    emailClientIfNeeded(client);
  });
}

function emailClientIfNeeded(client) {
  if (isClientActive(client)) {
    email(client);
  }
}

function isClientActive(client) {
  let clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

### 5.函数应该只做一层抽象
当函数的需要的抽象多于一层时通常意味着函数功能过于复杂，需将其进行分解以提高其可重用性和可测试性。

```ts:line-numbers {1}
// bad
function calculatePositiveAverage(numbers) {
  let positiveNumbers = numbers.filter(num => num > 0);
  
  let sum = positiveNumbers.reduce((acc, num) => acc + num, 0);
  let average = sum / positiveNumbers.length;
  
  return average;
}
```

```ts:line-numbers {1}
// good
function filterPositiveNumbers(numbers) {
  return numbers.filter(num => num > 0);
}

function calculateAverage(numbers) {
  let sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

function calculatePositiveAverage(numbers) {
  let positiveNumbers = filterPositiveNumbers(numbers);
  return calculateAverage(positiveNumbers);
}
```

### 6.函数参数 (理想情况下应不超过 2 个)
限制函数参数数量很有必要，这么做使得在测试函数时更加轻松。过多的参数将导致难以采用有效的测试用例对函数的各个参数进行测试。

应避免三个以上参数的函数。通常情况下，参数超过两个意味着函数功能过于复杂，这时需要重新优化你的函数。当确实需要多个参数时，大多情况下可以考虑这些参数封装成一个对象。

```ts:line-numbers {1}
// bad
function createMenu(title, body, buttonText, cancellable) {
  ...
}
```

```ts:line-numbers {1}
// good
var menuConfig = {
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
}

function createMenu(menuConfig) {
  ...
}
```

### 8.使用 Object.assign 设置默认对象
```ts:line-numbers {1}
// bad
var menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
}

function createMenu(config) {
  config.title = config.title || 'Foo'
  config.body = config.body || 'Bar'
  config.buttonText = config.buttonText || 'Baz'
  config.cancellable = config.cancellable === undefined ? config.cancellable : true;

}

createMenu(menuConfig);
```

```ts:line-numbers {1}
// good
var menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true
}

function createMenu(config) {
  config = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```

### 9.不要使用标记(Flag)作为函数参数
这通常意味着函数的功能的单一性已经被破坏。此时应考虑对函数进行再次划分。

```ts:line-numbers {1}
// bad
function createFile(name, temp) {
  if (temp) {
    fs.create('./temp/' + name);
  } else {
    fs.create(name);
  }
}
```

```ts:line-numbers {1}
// good
function createTempFile(name) {
  fs.create('./temp/' + name);
}

function createFile(name) {
  fs.create(name);
}
```

### 10.采用函数式编程
函数式的编程具有更干净且便于测试的特点。尽可能的使用这种风格吧。

```ts:line-numbers {1}
// bad
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

var totalOutput = 0;

for (var i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

```ts:line-numbers {1}
// good
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

var totalOutput = programmerOutput
  .map((programmer) => programmer.linesOfCode)
  .reduce((acc, linesOfCode) => acc + linesOfCode, 0);
```

### 11.for循环与高阶函数
1. for循环没有任何的抽象层次，需要我们“自行管理和控制循环过程”和“对功能实现”。
  - 关注循环过程
  - 关注实现的功能

2. forEach提供一层抽象，无需手动管理循环的迭代过程，只需要关注对功能的实现，但是实现的功能是什么由自己定义。
  - 不关注循环过程
  - 关注实现的功能（例如实现-转换、累加聚合、筛选）

3. map、reduce、filter有更高级别的抽象。既映射转换、累加聚合、筛选。我们无需手动管理循环的迭代过程，实现的功能就是转换、累加聚合、筛选。
  - 不关注循环过程
  - 不关注实现的功能（实现的功能本身就是转换、累加聚合、筛选）
  - 关注特定功能的实现
