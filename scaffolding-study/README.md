> 工作中用vue用的比较多，每次都是通过vue-cli生成项目。心中也一直就想去了解vue-cli是如何根据不同命令来生成不同的项目结构的，故而现在有空闲时间，就花了些时间仔细翻阅vue-cli文档之后，打算自己尝试实现一个脚手架

##### 概述

通过vue-cli我们会明白：
1. 脚手架本质是通过把远程仓库中的不同模版拉取到本地，vuejs-templates下有多个模版目录，这里面有vue-cli使用的所有模版，
2. vue-cli提供了丰富的选项和设定功能，让你通过命令和选项去实现自己的项目结构和增删功能

```
vue init <template-name> <project-name>
```
这个命令我们都很熟悉了，输入并回车之后会产生相当多的选项，由用户来自己决定是否需要那些功能

##### 技术

vue-cli文档写的很明白：

- `commander`: TJ大神开发的非常友好使用命令行的工具


- `Inquirer.js`: 传统的命令行只能单行一次性地输入所有参数和选项，使用这个工具可以自动提供提示信息，并且分步接收用户的输入，`vue init`就是用它来实现一步一步输入参数的过程


- `download-git-repo`: 远程下载git仓库


##### 项目介绍

1. bin目录下的titanium文件，没有后缀名。并且文件顶部必须使用`#!/usr/bin/env node`这段代码，否则直接使用`titianium xxx`会报错
2. 本地开发时可以使用`npm link`把`titianium`命令绑定到全局，可以实现直接以titianium作为命令开头,不用像以前使用`node .\commands\add.js`之类的命令了


---
参考文档：

[vue-cli](https://github.com/vuejs/vue-cli/tree/v2#custom-templates)

[vuejs-templates](https://github.com/vuejs-templates)

[SCION](https://github.com/jrainlau/scion)

[inquirer](https://github.com/SBoudrias/Inquirer.js)

[commander](https://github.com/tj/commander.js/)

[download-git-repo](https://github.com/flipxfx/download-git-repo)