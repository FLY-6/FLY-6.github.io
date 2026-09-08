---
title: "ROS2学习"
date: "2026-08-13"
excerpt: "ROS2通信接口"
tags: ["ROS2"]
category: "ROS2"
author: "FLY"
readingTime: 
---
# 1.创建通信接口功能包
```bash
ros2 pkg create --build-type ament_cmake interface
```
# 2.文件架构
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
```
# 3.在package.xml中添加依赖
```bash
<buildtool_depend>rosidl_default_generators</buildtool_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```
# 4.在CMakeLists.txt中添加依赖
```bash
find_package(rosidl_default_generators REQUIRED)
```
```bash
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/My_msg.msg"
  "srv/My_msg.srv"
)
```
# 5.编译和添加环境变量
```bash
colcon build --packages-select my_robot_msgs
source install/local_setup.sh
```
# 6.测试
```bash
ros2 interface show my_robot_msgs/msg/My_msg
```
