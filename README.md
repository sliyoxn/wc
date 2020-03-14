# software-engineering-personal-project-wd
 软件工程作业：个人项目：wc统计程序
 用于统计一段源代码的词数，代码行数等
 在线浏览：https://sliyoxn.github.io/wc/
 
 

 ### 兼容性
 1. 完全支持较新版本的chrome(谷歌)浏览器
 2. fireFox，Edge不支持选择文件时的格式筛选，默认可以选择全部格式的文件，谷歌浏览器下默认只能选择.js, .c, .cpp, .py,.java这几种格式的文件
 3. 不支持任何版本的IE浏览器 

    
 ### tips:
 1. 右侧抽屉打开后按ESC关闭
 
 ### 文件结构
 - libs 项目中本地保存的第三方库
 - test 测试相关的文件夹
    - file 用于测试的文件
    - res 保存上次测试的结果
    - util 测试需要的工具函数/类
    - Calculator.js 计算类，保存所有的计算逻辑
    - fileUnitTest.js 运行这个文件会对计算逻辑进行单元测试
 - util 
    - browserTypeUtil.js 浏览器内核/版本等的检测代码
    - clone.js 克隆相关的工具函数
    - fileUti.js 文件读取的工具函数
    - randomUtil.js 生成随机数的工具函数
 - index.html wc项目首页
 - index.css 首页的css代码
 - index.js 首页的js代码     
    
      
 
