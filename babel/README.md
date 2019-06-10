> 这次我们不使用webpack来配合babel实现编译代码

#### 1. 安装
首先我们安装babel必须使用的包

```
// 使用babel7+版本 babel7+开始，cli、core等npm包都在@babel下
yarn add -D @babel/core @babel/cli @babel/preset-env

// 使用babel6+版本
yarn add -D babel-core babel-cli babel-preset-env

```

#### 2. 添加编译配置
如果使用babel7，需要在项目根目录新建`babel.config.js`,写入以下内容


```js
const presets = [
  ["@babel/env", {
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "52",
      safari: "8"
    },
    // 是否需要自定引入babel-polyfill，
    // 默认为false，表示不引入，为usage前提是必须install babel-polyfill
    // 参数：Boolean，false|entry|usage，默认为false.
    useBuiltIns: "usage"
  }]
];
const plugins = []
module.exports = { presets };

```

如果使用babel6，需要在项目根目录下新建`.babelrc`, 代码如下

```js
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8", "safari >= 7"]
      }
    }]
  ]
}
```

##### 2.1 .babelrc和babel.config.js的区别

如果你想要用js代码来写babel配置，如果你想编译node_modules，推荐使用`babel.config.js`

如果你只想编译你自己写的代码,不编译node_modules，推荐使用`.babelrc`

babel官方推荐使用`babel.config.js`

#### 3. 运行

我们可以在package.json中scripts中添加运行脚本. 
```js
"scripts": {
  "build": "babel src -d lib", // 把src目录中的代码编译之后输出到lib目录下
  "test": "babel script.js --out-file script-compiled.js" // 编译script.js之后输出到script-compiled.js
}
```

---

参考文档：

[英文babel官网](https://babeljs.io/docs/en/usage)
