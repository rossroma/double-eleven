#!/bin/sh

#项目路径
subject_path=\/d\/github\/double-eleven

#更新依赖
echo "进入项目目录"
cd $subject_path
echo "进行项目的 git 更新"
git pull
echo "安装 npm 依赖"
cnpm install

rc=$?
if [[ $rc -ne 0 ]] ; then
printf "
#########################################
#             项目启动失败               #
#########################################
"

echo "开始启动项目"
node ./server.js & npm run dev
