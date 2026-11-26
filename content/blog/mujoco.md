---
title: "Mujoco仿真学习"
date: "2026-10-30"
excerpt: "Mujoco"
tags: ["Mujoco"]
category: "Mujoco"
author: "FLY"
readingTime: 
---
# 1.环境搭建
创建独立的python环境
```bash
python3 -m venv .venv
```
激活虚拟环境
```bash
source .venv/bin/activate
```
安装mujoco
启动mujoco图形查看器
```bash
python -m mujoco.viewer --mjcf=
```
# 2.文件架构
```bash
world
│
├── ground
│
├── ball
│   │
│   ├── freejoint
│   │
│   └── ball_geom
│
├── camera
│
└── light
```
子刚体与父刚体通过嵌套连接
```xml
<worldbody>

    <body name="base">

        <body name="link1">
            <joint name="joint1" type="hinge"/>
            <geom type="capsule" size="0.05 0.2"/>
        </body>

    </body>

</worldbody>
```
body pos：确定子刚体坐标系相对于父刚体的位置。
joint pos：确定关节轴经过子刚体局部坐标系中的哪个点