<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/**flex容器**/
.flex{
	display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
	display: -moz-box; /* Firefox 17- */
	display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
	display: -moz-flex; /* Firefox 18+ */
	display: -ms-flexbox; /* IE 10 */
	display: flex;
}
/* 纵向排列（主轴） */
.flex-column{
	-webkit-box-orient: vertical;
	flex-direction: column;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	-moz-flex-direction: column;
	-o-flex-direction: column;
}
/* 横向换行 */
.flex-row{
	-webkit-flex-wrap: wrap;
	-moz-flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	-o-flex-wrap: wrap;
	flex-wrap: wrap;
}
/* 平均分栏 */
.flex-full{
	-webkit-flex: 1; /* Chrome */
	-ms-flex: 1; /* IE 10 */
	flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
	-webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
	-moz-box-flex: 1; /* OLD - Firefox 19- */
}
/* 竖直居中（主轴是横向才生效） */
.align-center{
	-webkit-box-align: center;
	-moz-align-items: center;
	-ms-align-items: center;
	-o-align-items: center;
	-webkit-align-items: center;
	align-items: center;
}
.align-start{
	-webkit-box-align: start;
	-moz-align-items: flex-start;
	-ms-align-items: flex-start;
	-o-align-items: flex-start;
	-webkit-align-items: flex-start;
	align-items: flex-start;
}
.align-end{
	-webkit-box-align: end;
	-moz-align-items: flex-end;
	-ms-align-items: flex-end;
	-o-align-items: flex-end;
	-webkit-align-items: flex-end;
	align-items: flex-end;
}
/* 父元素-水平居中（主轴是横向才生效） */
.justify-center{
	-webkit-box-pack: center;
	-ms-justify-content: center;
	-moz-justify-content: center;
	-o-justify-content: center;
	-webkit-justify-content: center;
	justify-content: center;
}
.justify-between{
	-webkit-box-pack: justify;
	-ms-justify-content: space-between;
	-moz-justify-content: space-between;
	-o-justify-content: space-between;
	-webkit-justify-content: space-between;
	-webkit-justify-content: space-between;
	justify-content: space-between;
}
.justify-around{
	-webkit-box-pack: justify;
	-ms-justify-content: space-around;
	-moz-justify-content: space-around;
	-o-justify-content: space-around;
	-webkit-justify-content: space-around;
	-webkit-justify-content: space-around;
	justify-content: space-around;
}
.justify-end{
	-webkit-box-pack: end;
	-ms-justify-content: flex-end;
	-moz-justify-content: flex-end;
	-o-justify-content: flex-end;
	-webkit-justify-content: flex-end;
	-webkit-justify-content: flex-end;
	justify-content: flex-end;
}
.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected{
	background-color: #ffd922!important;
	border-radius: 4px;
}
.folder-tree{
	margin-top: 46px!important;
	background:#fff0!important;
	height: calc(100vh - 46px);
}
.ant-tree .ant-tree-treenode{
	padding: 0 0 8px 0!important;
}
.ant-tree .ant-tree-node-content-wrapper{
	min-height: 28px!important;
	line-height: 28px!important;
	text-align: left;
}
.ant-tree .ant-tree-node-content-wrapper:hover{
	background-color: #d6d6d6!important;
	border-radius: 4px;
}
.hljs{
	background:none!important;
}
.keyword-high-light{
	color:#f73131;
	font-weight: bold;
}
/* 描述每种高亮方式的CSS特性 */
::highlight(type-a) {
	color: #ff0000;
	text-decoration: dotted underline #ff0000 2px;
}
</style>
