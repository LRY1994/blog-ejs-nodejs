---
title: 社交分享接口
date:   2018/7/4
categories:  Experience
tags: 日常记录 
---

### 社交分享接口
qzone       : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',

qq          : 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',

tencent     : 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',

weibo       : 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',


douban      : 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',

diandian    : 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',

linkedin    : 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',

facebook    : 'https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}',

twitter     : 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',

google      : 'https://plus.google.com/share?url={{URL}}'

##### 微博
http://service.weibo.com/share/share.php?
```
url=
&title=
&pic=可为空
&appkey=可为空
```

##### 发送给QQ好友
http://connect.qq.com/widget/shareqq/index.html?
```
url=
title=
source= 默认读取head标签的site：<meta name="site" content="http://overtrue" />
desc=默认读取head标签的description：<meta name="description" content="http://overtrue" />
pics=
```

##### 腾讯微博
http://share.v.t.qq.com/index.php?
```
c=share
a=index
title=
url=
pic=
```

##### 豆瓣
https://www.douban.com/share/service?
```
href=
&name=
&text=
```

##### 豆瓣
http://shuo.douban.com/!service/share?
```
href=
name=
text=
image=
starid=0
aid=0
style=11
```

##### QQ空间(这个好像腾讯坏了，都是undefined)
http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?
```
url=
desc=
summary=
site=
```

##### linkin
http://www.linkedin.com/shareArticle?
```
mini=true
ro=true
title=
url=
summary=
source=
armin=armin
```

##### 点点（不知道是什么东西）
http://www.diandian.com/share?
```
lo= 文章链接
ti= 文章标题
type=link
```

##### facebook
https://www.facebook.com/sharer/sharer.php?
```
u= 文章链接
```

##### twitter
```
https://twitter.com/intent/tweet?
text= 文章标题
url=
via= 好像是域名
```

##### google
```
https://plus.google.com/share?
url=
```
