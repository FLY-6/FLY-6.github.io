---
title: "ROS2学习"
date: "2026-08-01"
excerpt: "ROS2工作空间"
tags: ["ROS2"]
category: "ROS2"
author: "FLY"
readingTime: 
---
## 1.ROS2工作空间
1.创建工作空间  
2.安装依赖用rosdep工具自动安装
```bash
sudo apt install -y python3-pip
sudo pip3 install rosdepc
sudo rosdepc init
rosdepc update
rosdepc install -i --from-path src --rosdistro humble -y #安装依赖
```
3.安装编译器
```bash
sudo apt install python3-colcon-ros
```
4.编译工作空间
```bash
colcon build
colcon build --packages-select
rm -rf build install log #在工作空间目录下运行
```
5.设置环境变量
```bash  
source install/local_setup.sh # 仅在当前终端生效
echo " source ~/dev_ws/install/local_setup.sh" >> ~/.bashrc # 所有终端均生效
```
## 2.ROS2功能包
 1.创建功能包  
```bash
ros2 pkg create --build-type <build-type> <package_name>
ros2 pkg create --build-type ament_python
```
 2.功能包的结构  
 ```bash
 learning_pkg_python
│
├── setup.py
│
└── learning_pkg_python
    │
    ├── __init__.py
    │
    └── test.py
```
 ![图片](/images/image2.png)
 .xml文件主要描述功能包的依赖
 CMakeLists.txt文件是编译规则
 ![图片](/images/image1.png)
 .xml文件主要描述功能包的依赖
 setup.py描述程序入口
 ## 3.ROS2节点
### 1.节点:执行具体任务  
### 2.创建节点流程  
编程接口初始化  
创建节点并初始化  
实现节点功能  
销毁节点并关闭接口  
```bash
import rclpy                            # ROS2 Python接口库
from rclpy.node import Node             # ROS2 节点类
def main(args=None):                               # ROS2节点主入口main函数
    rclpy.init(args=args)                          # ROS2 Python接口初始化
    node = HelloWorldNode("node_helloworld_class") # 创建ROS2节点对象并进行初始化
    rclpy.spin(node)                               # 循环等待ROS2退出
    node.destroy_node()                            # 销毁节点对象
    rclpy.shutdown()                               # 关闭ROS2 Python接口
```
### 3.话题:节点直接数据传输
发布者  
```bash
self.pub = self.create_publisher(String, "chatter", 10)   # 创建发布者对象（消息类型、话题名、队列长度）
```
订阅者  
```bash
self.sub = self.create_subscription(String, "chatter", self.listener_callback, 10)   # 创建订阅者对象（消息类型、话题名、回调函数、队列长度）
```
回调函数参数(self,msg)
消息类型、话题名需要一致
### 4.服务(一问一答)
服务端   
编程接口初始化  
创建节点并初始化  
创建服务器端对象  
通过回调函数处进行服务  
向客户端反馈应答结果  
销毁节点并关闭接口  
```bash
self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.adder_callback)  # 创建服务器对象（接口类型、服务名、服务器回调函数）
```
回调函数参数（self,request,response）
客户端  
编程接口初始化  
创建节点并初始化  
创建客户端对象  
创建并发送请求数据  
等待服务器端应答数据  
销毁节点并关闭接口  
```bash
self.client = self.create_client(AddTwoInts, 'add_two_ints') # 创建服务客户端对象（服务接口类型，服务名）
```
### 5.通信接口
接口名必须大写 字段小写
learning_interface.srv.AddTwoInts
包名.接口类型.接口名字
```
Service
|
├── Request()
└── Response()
```
自定义通信接口功能包结构
```bash
src
|
|—— interface
    ├── msg
        ├── My_msg.msg
    ├── srv
        ├── My_msg.srv
    ├── action
        ├── My_msg.action
    ├── CMakeLists.txt
    ├── package.xml
|—— buzzer
    ├── setup.py

    |—— package.xml

    ├── buzzer   
        │
        ├── __init__.py
        │
        └── test.py
```
### 6.动作
```
Action
|
├── Goal()
├── Result()
└── Feedback()
```
![图片](/images/image3.png)
### 7.参数
1.创建参数
```bash
self.declare_parameter('robot_name', 'mbot')              # 创建一个参数，并设置参数的默认值
```
2.读取参数
```bash
upper_red[0] = self.get_parameter('red_h_upper')
```
```bash   
ros2 param get turtlesim background_b        # 查询某个参数的值
$ ros2 param set turtlesim background_b 10     # 修改某个参数的值
```
### 8.分布式通信和DDS
### 9.Launch文件
```bash
ros2 launch learning_launch simple.launch.py
```
1.namespace是批量改变节点名字空间；remapping 是把节点内部使用的某个资源名字映射到另一个名字。
功能包编译配置 
### 10.TF坐标管理
### 11.URDF文件(机器人描述文件)
### 12.Gazebo仿真
### 13.服务器重启命令
```bash
sudo systemctl restart start_app_node.service
```
### 14.yaml参数文件
```bash
/speed_controller:              # 顶层：节点名（顶格，/开头）
  ros__parameters:              # 固定关键字，缩进2空格
    max_linear_speed: 0.3       # 参数，缩进4空格
    max_angular_speed: 0.8
```
### 15.机械臂舵机控制拆分
```bash

JointTrajectoryActionController->ControllerManager->servo_controller->ros_robot_controller/bus_servo/set_position

```
### 16.JointTrajectory重构







