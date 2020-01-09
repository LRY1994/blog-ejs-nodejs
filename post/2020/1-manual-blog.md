---
title:  "不借助博客框架建博客"
date:   2020/1/9
categories:  Experience 
---

这个主要是nodejs操作文件的问题

marked转化成html后的id会变成小写的 ``[React与vue比较](#React与vue比较)``结果会渲染成``<h1 id="react与vue比较">React与vue比较</h1>``

锚点有标点符号也不行``[PP.js](#PP.js)``结果会渲染成``<h1 id="pjs">PP.js</h1>``