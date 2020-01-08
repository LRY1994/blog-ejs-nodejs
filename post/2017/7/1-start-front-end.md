---
layout: post
title:  "前端启航"
date:   2017/7/1 
categories:  Collecting  
tags: 专题探究
---
以前开始学前端就是看了这份同学转给我的文档，还是有点指导性质的

1.  { 网站前端 }
如果你有耐心坚持个一年以上的话, 我会推荐HTML, css ,js, apache ,php, mysql

后三者是需要装软件的, 推荐wamp, 绝佳的一站式环境配置, WampServer, the web development platform on Windows 直接包括了apache, php, mysql三个软件, 省的自己一个一个装.
有不少人在评论里问mac os下对应的软件, 这里补充一下: XAMPP Installers and Downloads for Apache Friends


1.	首先学习HTML, css, 这两个东西是一套的, 非常容易理解, 把w3school上面的教程过一遍就会了, 记住要一个个过, 千万不要偷懒, 一旦开始偷懒, 你会越来越偷懒, 最后什么都没学成. HTML 教程 , CSS 教程
2.	下一步是学js, js相比前两个会难的多, 因为js才是一门正式的编程语言, 同样, w3school的教程全过一遍, JavaScript 教程 , 教程过完了就可以买书看了, 强烈推荐一本超好入门书: 《JavaScript DOM编程艺术（第2版）》(Jeremy Keith，Jeffrey Sambells)【摘要 书评 试读】 , 认真学, 多看, 看完之后学jquery, 这个时候你基本能够了解语言库了, jquery 也直接过一遍w3school的教程,jQuery 教程 . jquery会了, 基本上你网页开发前端就已经入门了, 如果你学的扎实, 反复的看, 其实你就可以胜任前端开发的工作了, 不过浏览器兼容性还是解决不了的, 不过你目标不是前端工程师, 浏览器的兼容性不了解也无所谓.
3.	在第二步你学习js的时候, 你可能就接触一些后端的东西, 没错, 就是ajax. 这个是需要后端返回数据的. 这个时候你要开始学习php了, 入门php相比于js会更麻烦一些, 因为运行php需要有很多细节要处理, 所以一本好的入门书籍是非常重要的, 这个w3school上面的php帮不了什么忙了, 推荐一本书: 《php和mysql web开发（原书第4版）》([澳]威利，[澳]汤姆森)【摘要 书评 试读】 , 当然, 这过程中你会遇到各种各样的问题, 但是如果你学到了这一步, 非常欢迎你私信我来学习, 我绝对帮助, 现在肯学习的孩子太少了, 而且题主才上高中, 太难能可贵了.
4.	一些注意点, 学习HTML, css, js的时候, 只要有浏览器就够了, 不需要装wamp, 编辑器推荐sublime, 多用google, 多敲代码, 尤其是多敲代码非常重要, 不敲代码你什么都学不会. 其他的想起来再补充吧.

对于那些说加入xxx阵营的, 不要理他们, 直接在win上面学, php和apache对win的兼容性非常好, 完全可以从入门学到精通都无需碰linux. 当然, 如果你网站最终上线的话, 还是需要接触linux服务器进行部署. 这个到需要部署的时候再说, 提前接触linux就是浪费时间.2014-02-16










2. 网站开发开发大致分为前端和后端，前台主要负责实现视觉和交互效果，以及与服务器通信，完成业务逻辑。可以按如下思路学习系统学习：
基础知识：
1. html + css 这部分建议在 w3school 在线教程 上学习，边学边练，每章后还有小测试。 之后可以模仿一些网站做些页面。在实践中积累了一些经验后，可以系统的读一两本书，推荐《head first html 与 css 中文版》，这本书讲的太细了，我没能拿出耐心细读。你可以根据情况斟酌。 
2. javascript 要学的内容实在很多，如果没有其他编程语言的基础的话，学起来可能要费些力，还是建议先在 w3school上学习。之后建议马上看《javascript语言精粹》，js是一门很混乱的语言，这本书能够帮助你区分哪些是语言的精华，哪些是糟粕，对于语言精华，应该深入学习。糟粕部分能看懂别人写的代码就行，自己就不用尝试了。
进阶：
有了以上基础，就可以进行一般的静态网页设计，不过对于复杂的页面还学进一步学习。
1. css。必看《精通css》，看完这本书你应该对：盒子模型，流动，block，inline，层叠，样式优先级，等概念非常了解了。作为练习可以看下《css艺门之匠》这本书，它对标题，背景，圆角，导航条，table，表单等主题都有详细的介绍。
2. javascript。上面提到内容还不足以让你胜任js编程。在有了基础之后，进一步学习内容包括：

a) 框架。推荐jQuery，简单易用，我的第一web项目就是在w3school简单学习后，直接上手jQuery完成的，真的很简单，很好用。jQuery适用环境有限，对于那些对性能要求很高的页面无法胜任。推荐了解一下 YUI 或百度的 tangram ，都很好用，学习方法也很简单，照着产品文档做几个页面就行了，不用面面俱到，以后遇到问题查文档就行了。框架可以帮你屏蔽浏览器的差异性，让你能更专注与web开发学习的精髓部分。补充： 可以使用 codecademy 学习 javascript，jQuery，用户体验真的很好（感谢 TonyOuyang ）。 

b) javascript 语言范式 。这个名字可能并不恰当，只是我找不到可以描述“面向对象”，“函数式”这个两个概念的概念。javascript不完全是一个面向对象的语言，它的很多设计理念都有函数编程语言的影子，甚至说如果你不用面向对象，完全可以把它理解成一门函数式编程语言。javascript的很多语言特性，都是因为他具有函数是语言的特点才存在的。这部分推荐先学习面向对象的基本理论，对封装，继承，多态等概念要理解，维基百科，百度百科会是你的帮手，另外推荐《object oriented javascript》，应该有中文版。对与函数式编程我了解的也不系统，不好多说，可以自己百度一下。

c) javascript 语言内部机制。必须弄清如下概念：js中变量的作用域，变量传递方式，函数的定义环境与执行环境，闭包，函数的四种调用方式（一般函数，对象的方法，apply，call），以及四种调用方式下，‘this'指向的是谁。这部分内容你会在《javascript语言精粹》中详细了解。另外，你必须理解json。

d) dom编程，这个web前端工程师的核心技能之一。必读《dom编程艺术》，另外《高性能javascript》这本书中关于dom编程的部分讲的也很好。

e) ajax编程，这是另一核心技术。ajax建议在网上查些资料，了解这个概念的来龙去脉，百度百科，维基百科上的内容就足够了。真正编程是很容易的，如今几乎所有框架都对ajax有良好的封装，编程并不复杂。

f) 了解浏览器差异性。这部分包括css和js两部分，浏览器差异内容很多，建议在实践中多多积累。另外对于浏览器的渲染模式，DOCTYPE等内容应该系统学习。
再进一阶：
有了以上知识，对于大多数小型网站，你应该已经可以写出能够工作的代码了。但写出可以运行的代码，只是编程的最初级阶段。更高要求大概还有三方面：1易维护，2可测试，3高性能，如果页面流量有要求，那第四个就是，4低流量。
1. 易维护。对于页面你该理解‘样式’，‘数据’，‘行为’三者分离，对应的当然就是css,html,js。对于js代码，你最好了解设计模式，重构，MVC等内容。
2. 可测性。js代码可测性的主题，我正在研究，欢迎感兴趣的同学联系我，共同学习
3. 高性能。必读《高性能javascript》
4. 低流量。技巧性太强，非一朝一夕之功，不多说
补充：
对于前段开发，核心部分基本就这些了，可以根据自己的兴趣爱好选择性学习以下内容。
1. 美工。 大公司都有专业的美工人员，不过如果爱好也可以了解
2. 交互设计。大公司依然有专业人士搞这些，不过如果爱好也可了解。推荐《简约至上》。

3. 后端。应该说前段工程师必须至少了解一门后端语言，不过如果爱好也可深入学习，入手难度比较低的应该是php了。这部分由可分为基于页面，基于框架两种。大型项目都是基于框架开发的，建议至少了解一个MVC框架，php的zend，Home : The Official Microsoft ASP.NET Site 的 Home : The Official Microsoft ASP.NET Site mvc等等太多了，好还框架的设计思想都大同小异。
4. flash。我并没有吧flash作为前端工程的核心技能之一，因为我不会，不过ActionScript应该和js大同小异，可以根据工作需要学习。不过我的原则是能不用就尽量不用，其实很多效果通过js，css都可以实现，完全不需要flash。而且随着html5的发展flash早晚会淘汰。
5. html5和css3 。html5的标准到现在还没有正式发布，不过目前几乎所有新的浏览器都已经开始支持，手机上就更是如此，建议学习，很好，很强大。

前端开发需要学习的内容，很多很杂。至于视觉设计，交互设计，产品设计，这些内容，如果感兴趣，可以去了解。技术学习，面要铺开，但深度更重要。

前端开发需要学习的内容，很多很杂，我在最开始学习的前两个月也是一片迷茫。一路走来，发现也走了些弯路。美工，交互设计，flash，js，html+css，后端，随便哪种技能，如果学的特别牛，都可以保证你拥有一个职业。想通吃，没个几年怕是不成。关键是选准自己的爱好，深入学习一项，面要铺开，但深度更重要。以上我这一年学习经验的总结，希望对你有帮助。











3. Nicholas C. Zakas谈怎样才能成为优秀的前端工程师：

昨天，我负责了Yahoo!公司组织的一次面试活动，感触颇深的是其中的应聘者提问环节。我得说自己对应聘者们提出的大多数问题都相当失望。我希望听到一些对在Yahoo！工作充满激情的问题。在昨天的应聘者中，只有一个人的问题是我认为最好的，那个人问我：“你觉得怎么才能成为优秀的前端工程师？”我觉得很有必要把这个问题从面试房间里拿出来讨论一下。

首先，前端工程师必须得掌握HTML、CSS和JavaScript。只懂其中一个或两个还不行，你必须对这三门语言都很熟悉。也不是说必须对这三门语言都非常精通，但你至少要能够运用它们完成大多数任务，而无需频繁地寻求别人的帮助。

优秀的前端工程师应该具备快速学习能力。推动Web发展的技术并不是静止不动的，没错吧？我甚至可以说这些技术几乎每天都在变化，如果没有快速学习能力，你就跟不上Web发展的步伐。你必须不断提升自己，不断学习新技术、新模式；仅仅依靠今天的知识无法适应未来。Web的明天与今天必将有天壤之别，而你的工作就是要搞清楚如何通过自己的Web应用程序来体现这种翻天覆地的变化。

计算机科学这个大门类下面的许多分支在人们眼中实际上都不外乎科学。但是，我们所说的前端不是什么科学，而是艺术。艺术家不仅要掌握谋生的技术，还要懂得如何运用。对同一个问题的解决方案在这种情况适用，在另一种情况下可能就不适用。对Web应用程序的前端而言，解决同一问题的方案经常会有很多。没有哪个方案是错的，但其中确实有一些是更合适的。优秀的前端工程师应该知道在什么情况下使用哪种方案更合适，而在什么情况下应该重新选择。

优秀的前端工程师需要具备良好的沟通能力，因为你的工作与很多人的工作息息相关。在任何情况下，前端工程师至少都要满足下列四类客户的需求。

1.	产品经理——这些是负责策划应用程序的一群人。他们能够想象出怎样通过应用程序来满足用户需求，以及怎样通过他们设计的模式赚到钱（但愿如此）。一般来说，这些人追求的是丰富的功能。
2.	UI设计师——这些人负责应用程序的视觉设计和交互模拟。他们关心的是用户对什么敏感、交互的一贯性以及整体的好用性。他们热衷于流畅靓丽但并不容易实现的用户界面。
3.	项目经理——这些人负责实际地运行和维护应用程序。项目管理的主要关注点，无外乎正常运行时间（uptime）——应用程序始终正常可用的时间、性能和截止日期。项目经理追求的目标往往是尽量保持事情的简单化，以及不在升级更新时引入新问题。
4.	最终用户——当然是应用程序的主要消费者。尽管我们不会经常与最终用户打交道，但他们的反馈意见至关重要；没人想用的应用程序毫无价值。最终用户要求最多的就是对个人有用的功能，以及竞争性产品所具备的功能。

那么，前端工程师应该最关注哪些人的意见呢？答案是所有这四类人。优秀的前端工程师必须知道如何平衡这四类人的需求和预期，然后在此基础上拿出最佳解决方案。由于前端工程师处于与这四类人沟通的交汇点上，因此其沟通能力的重要性不言而喻。如果一个非常酷的新功能因为会影响前端性能，必须删繁就简，你怎么跟产品经理解释？再比如，假设某个设计如果不改回原方案可能会给应用程序造成负面影响，你怎么才能说服UI设计师？作为前端工程师，你必须了解每一类人的想法从何而来，必须能拿出所有各方都能接受的解决方案。从某种意义上说，优秀的前端工程师就像是一位大使，需要时刻抱着外交官的心态来应对每一天的工作。

我告诫新来的前端工程师最多的一句话，就是不要在没有作出评估之前就随便接受某项任务。你必须始终记住，一定先搞清楚别人到底想让你干什么，不能简单地接受“这个功能有问题”之类的大概其的说法。而且，你还要确切地知道这个功能或设计的真正意图何在。“加一个按钮”之类的任务并不总意味着你最后会加一个按钮。还可能意味着你会找产品经理，问一问这个按钮有什么用处，然后再找UI设计师一块探讨按钮是不是最佳的交互手段。要成为优秀的前端工程师，这种沟通至关重要。

无论从哪个方面讲，我都觉得前端工程师是计算机科学职业领域中最复杂的一个工种。绝大多数传统的编程思想已经不适用了，为了在多种平台中使用，多种技术都借鉴了大量软科学的知识和理念。成为优秀前端工程师所要具备的专业技术，涉及到广阔而复杂的领域，这些领域又会因为你最终必须服务的各方的介入而变得更加复杂。专业技术可能会引领你进入成为前端工程师的大门，但只有运用该技术创造的应用程序以及你跟他人并肩协同的能力，才会真正让你变得优秀。


网页开发涉及的技术有很多方面，如果想深入学习的话，就必须有所取舍，扎实的基本功才是硬道理，正所谓术业有专攻，并不是所有人都是万能的。 
就像我，从事php等相关开发已经8年了，但是就你所列出来的那些项技能来说我只能说我精通PHP、SQL等，而js之类的并不是我所擅长的，就是如此。 
闲话少说，来给你梳理一下吧 
基本上网站制作和开发分为UI、UE、CODE、DB四个部分，这也就是我说的你要选择的学习方向： 

UI指的是网页设计，也就是利用各种素材制作网页的效果图，学习这个需要掌握的就是photoshop、flash、firework之类的工具，当然还要有比较好的审美。 

UE指的是网页前端及用户体验部分的开发，这一阶段需要掌握的有html和javascript以及css。html是所有网页开发的基础要做到滚瓜烂熟，css的话以我的经验是知道常用的即可，剩下的就是具体问题具体分析了。js则比较麻烦，其实现在大家做网站一般都用jquery这个封装好的js库来做，但是我还是建议新手从js的基本语法开始学起，这样遇到了棘手的麻烦才有章可循，而不是一味的google下jquery的plugin之类的 

CODE部分也就是编程部分了，既然你已经学了php了，那就继续深入这门语言好了。我做技术总监也有一阵子了，也面试过很多所谓的phper，我承认他们可能会照猫画虎的写些程序，可真的有些人连include和require的区别是什么都说不出来，就更别提什么值引用之类的了。所以我还是强调基本功，基本功是最重要的，否则你永远就是一个堆代码的蓝领工人，永远写不出高级的程序，永远看不懂国外高手写的牛逼程序。学完基本功后接下来的建议就是找一个开源的PHP框架，读懂它的代码。我刚学php的时候还没有什么很好的框架，我是用一个星期的时间把smarty的源代码读了一遍（后来对其作了优化，速度提升30%）。现在的话这种开源框架多如牛毛，随便找个来看就可以，喜欢中文的话可以看thinkphp，喜欢速度的话可以看doophp，老派一点的话可以看cakephp等等等等。等你把某个具体的框架通读一遍下来之后，你就可以出师了，基本可以秒杀市面上80%的所谓PHPer。 

DB就不多说了，就是数据库层面的，掌握标准的SQL就可以了，做网页的话多了解一些mysql的相关语法和配置什么的也就差不多了。 
基本也就这些了，看你的学习方向了，祝你早日成功。 
