> 该项目以vue-cli 2+为学习对象

- 学习如何构建脚手架
- 学习tapable原理
- 学习如何编写loader
- 学习如何编写plugin

##### package.json中browserslist字段

```
 // babel、autoprefixer都依赖browserslist
 "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8",
    "safari >= 7"
  ]

```
有了browserslist字段，我们就可以把.babelrc中targets字段`"browsers": ["> 1%", "last 2 versions", "not ie <= 8", "safari >= 7"]`删除