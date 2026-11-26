# 1.urdf创建
1.添加起始为0的链接
2.添加关节创建链接
3.固定关节原点
4.调整关节轴类型
5.修复视觉原点
```bash
ros2 launch urdf_tutorial display.launch.py model:=/home/fly/my_robotws/src/my_robot_description/urdf/arm.urdf
```
6.origin坐标是相对于父级位置
7.$(find my_robot_description)查找包
12.xarco架构
```bash
robot.xacro
│
├── common_properties.xacro   ← 所有尺寸、质量、颜色、惯量等公共参数
├── materials.xacro           ← 材质
├── arm.xacro                 ← 机械臂
├── gripper.xacro             ← 夹爪
├── camera.xacro              ← 相机
└── sensors.xacro             ← 传感器
robot.xacro
│
├── include common_properties.xacro
│       │
│       ├── property A
│       └── property B
│
├── include arm.xacro
│       │
│       ├── 使用 property A
│       └── 使用 property B
│
└── 最终展开成一个完整 URDF
```
