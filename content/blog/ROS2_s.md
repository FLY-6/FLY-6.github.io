---
title: "ROS2学习"
date: "2026-08-01"
excerpt: "ROS2工作空间"
tags: ["ROS2"]
category: "ROS2"
author: "FLY"
readingTime: 
---
## ROS2工作空间
1.创建工作空间  
2.安装依赖用rosdep工具自动安装
```bash
sudo apt install -y python3-pip
sudo pip3 install rosdepc
sudo rosdepc init
rosdepc update
```
3.编译工作空间
```bash
colcon build
```
4.设置环境变量
```bash  
source install/local_setup.sh # 仅在当前终端生效
echo " source ~/dev_ws/install/local_setup.sh" >> ~/.bashrc # 所有终端均生效
```
## ROS2功能包
 1.功能包的结构
 ![图片](/images/image2.png)
 .xml文件主要描述功能包的依赖
 CMakeLists.txt文件是编译规则
 ![图片](/images/image1.png)
 .xml文件主要描述功能包的依赖
 setup.py描述程序入口


