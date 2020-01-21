---
title:  "不借助博客框架建博客"
date:   2020/1/9
categories:  Experience 
---
### Backdrop
在网上搜索如何搭建博客，大部分是基于hexo\Jekyll等别人已经写好的框架，往里面套就可以了。最近很好奇这个过程，然后自己操作了一下，其实这个主要是nodejs操作文件的问题。

举例hexo,一共需要2个github库，一个是用来生成文件的，一个是用来存放生成后的文件，也就是git page托管的内容。git page就相当于一个文件目录，打开``https://lry1994.github.io/``是按照静态文件路径渲染的。

为什么没有node进程却可以实现点击"标签","分类"显示对应内容？原因就在于hexo把``所有可能的结果``都生成html放在git page下面了。观察git page里面的文件就会发现有arhchive、tags、page目录，这些就是所有可能的结果。

<a href="https://www.larscheng.com/hexo-principle/" >这篇文章讲得很清晰</a>

### 开始干活
用最少的依赖库实现自己的博客。以下是用到的全部库:

```json
    "ejs": "^3.0.1",//ejs渲染插值html
    "highlight.js": "^9.17.1",//高亮代码
    "marked": "^0.8.0",//md转化成html
    "mime": "^2.4.4",//获取mime类型。这个如果可以自己写也不用
    "node-sass": "^4.13.0"//scss转化成css。如果不用scss也不用这个依赖
```
生成文件的node代码：<a href="https://github.com/LRY1994/blog-ejs-nodejs">代码地址</a>


### 过程中遇到的问题
#### 使用marked
marked转化成html后的id会变成小写的

比如 ``[React与vue比较](#React与vue比较)`` ， 结果会渲染成 ``<h1 id="react与vue比较">React与vue比较</h1>``
锚点有标点符号也不行 ``[PP.js](#PP.js)`` 结果会渲染成``<h1 id="ppjs">PP.js</h1>``

看到有人用``markdown-it``,用了一下发现渲染后的锚点有问题，锚点没有id。比如上面就会渲染成``<h1 xxx>React与vue比较</h1>``,导致不能滚动到锚点
