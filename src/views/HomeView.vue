<template>
	<div class="flex container">
		<slider ref="sliderBar" @change="onChangeSliderMenu" @hide="hideSliderBar"></slider>
		<div class="flex flex-full">
			<div ref="sliderOutline" class="slider-outline" :style="{width:siderWidth+'px'}">
				<div ref="handle" class="split-handle"></div>
				<div class="flex align-center justify-between menu" :style="{paddingLeft:!sliderBarVisible?'100px':'10px'}">
					<div @click="showSliderBar" v-if="sliderBarVisible==false" class="menu-btn flex align-center justify-center">
						<img src="../assets/icon-slider-bar.png" />
					</div>
					<div v-if="list.length>0" title="删除笔记" class="menu-btn flex align-center justify-center" @click="delVisible=true"><img
							src="../assets/trash.png" /></div>
					<div v-else title="删除笔记" class="menu-btn flex align-center justify-center"><img
							src="../assets/trash-grey.png" /></div>
					<div title="创建笔记" @click="addNote(1)" class="menu-btn flex align-center justify-center"><img
							src="../assets/edit.png" /></div>
				</div>
				<div class="container" ref="listContainer" @scroll="handleListScroll">
					<transition-group name="fade" class="fade-box">
						<div v-if="sliderMenu=='all'" @click="switchSelected(item,index)" @contextmenu="contextmenu(item,index,$event)"
							v-bind:class="item._id==selected._id?'item flex flex-column selected':'item flex flex-column'"
							v-for="(item,index) in list" :key="item._id">
							<div class="title" :style="{width:(siderWidth-40)+'px'}" v-html="item.title"></div>
							<div class="time">{{new Date(item.createdAt).toLocaleString()}}</div>
						</div>
						<div v-if="sliderMenu=='collect'" @click="switchSelected(item,index)" @contextmenu="contextmenu(item,index,$event)"
							v-bind:class="item._id==selected._id?'item flex flex-column selected':'item flex flex-column'"
							v-for="(item,index) in list" :key="item._id">
							<div class="title" :style="{width:(siderWidth-40)+'px'}" v-html="item.title"></div>
							<div class="time">{{new Date(item.createdAt).toLocaleString()}}</div>
							<img src=""/>
						</div>
						<div v-if="sliderMenu=='trash'" @click="switchSelected(item,index)" @contextmenu="contextmenu(item,index,$event)"
							v-bind:class="item._id==selected._id?'item flex flex-column selected deleted':'item flex flex-column deleted'"
							v-for="(item,index) in list" :key="item._id">
							<div class="title" :style="{width:(siderWidth-40)+'px'}" v-html="item.title"></div>
							<div class="time">{{new Date(item.createdAt).toLocaleString()}}</div>
						</div>
					</transition-group>
					<a-empty v-if="list.length==0" :image="simpleImage" :description="'暂无笔记'"/>
				</div>
			</div>
			<div class="flex flex-column flex-full content">
				<div class="flex align-center justify-between menu">
					<!-- <div class="flex justify-between btn-list">
						<div title="提醒" class="menu-btn flex align-center justify-center">
							<img src="../assets/clock.png" @click="setTimer" />
						</div>
						<div title="加锁" class="menu-btn flex align-center justify-center">
							<img src="../assets/lock.png" />
						</div>
					</div> -->
					<div class="flex flex-full input"><a-input v-model:value="keyword" @change="changeKeyword" :allowClear="true"
							placeholder="搜索" /></div>
				</div>
				<div class="flex flex-full container" v-show="list.length>0&&selected.type=='markdown'">
					<markdown ref="markdown" @changeContent="changeContent" :content="selected.content"></markdown>
				</div>
			</div>
		</div>
		<a-modal
			v-model:visible="delVisible"
			title="删除笔记"
			cancelText="取消"
			okText="确定"
			@ok="confirmDelNote"
		>
		  <p><font color="#faad14">确定删除这个笔记吗</font></p>
		</a-modal>
		<div class="type-box-mask" v-if="isShowMenu" @click="isShowMenu=false">
		</div>
		<div class="fixed-box flex flex-column" :style="fixedBoxStyleObject" v-show="isShowMenu" @blur="isShowMenu=false" ref="fixedBoxRef">
			<template v-if="selected.deleted==true">
				<div class="item" @click="recoverDelNote">恢复笔记</div>
				<div class="item" @click="confirmDelNote">删除笔记</div>
			</template>
			<template v-else>
				<div class="item" v-if="selected.collect" @click="removeCollect">取消收藏</div>
				<div class="item" v-else @click="collect">收藏</div>
				<div class="item">上锁</div>
				<div class="item">分类标签</div>
				<div class="item" @click="confirmDelNote">删除笔记</div>
			</template>
		</div>
	</div>
</template>
<script>
	import { defineComponent } from 'vue';
	import { Empty } from 'ant-design-vue';
	import Markdown from '../components/editor/Markdown.vue';
	import Slider from '../components/Slider.vue';
	import {
		throttle
	} from "lodash";
	const SIDER_WIDTH_DEFAULT = 270;
	const SIDER_BAR_WIDTH_DEFAULT = 200;
	const SIDER_WIDTH_MAX = 450;
	export default {
		name: 'HomeView',
		components: {
			Slider,
			Markdown
		},
		data() {
			return {
				isLoading:false,
				siderWidth: SIDER_WIDTH_DEFAULT,
				siderBarWidth: SIDER_BAR_WIDTH_DEFAULT,
				sliderBarVisible: true,
				timerId: null,
				keyword: '',
				checked: false,
				delVisible: false,
				mouse: {
					isDown: false,
					startX: 0
				},
				list: [],
				page: 1,
				pageSize: 10,
				selected: {
					_id: '',
					idx: 0,
					type: '',
					content:'',
					collect:false,
					deleted:false
				},
				simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
				fixedBoxStyleObject:{
					left:0,
					top:0
				},
				isShowMenu:false,
				sliderMenu:'all'
			};
		},
		mounted() {
			this.init();
			let _this = this;
			document.addEventListener('mousedown', (e) => {
			  if (e.button === 2) {
			    _this.isShowMenu=false;
			  }
			});
			this.fetchNotes();
		},
		destroy() {
			const app = document.getElementById("app");
			this.$refs.handle.onmousedown = null;
			app.onmousemove = null;
			app.onmouseup = null;
		},
		methods: {
			onChangeSliderMenu(menu){
				this.sliderMenu = menu;
				this.page = 1;
				this.list = [];
				this.keyword = '';
				this.fetchNotes();
			},
			hideSliderBar(){
				this.sliderBarVisible = false;
			},
			showSliderBar(){
				this.sliderBarVisible = true;
				this.$refs.sliderBar.show();
			},
			switchSelected(note,idx){
				this.selected.collect=note.collect;
				this.selected.deleted=note.deleted;
				this.selected.type=note.type;
				this.selected.idx=idx;
				this.selected.content=note.content;
				this.selected.title=note.title;
				this.selected._id=note._id;
				if (note.type == 'markdown') {
					this.$refs.markdown.init(this.selected.content);
				}
			},
			fetchNotes(keyword) {
				if(this.isLoading==false){
					this.isLoading=true;
				}
				let skip = (this.page - 1) * this.pageSize;
				let params = {};
				let reg = null;
				if(keyword){
					reg = new RegExp(keyword);
					params = {content:reg}
				}
				this.$db.findNotes(keyword,this.sliderMenu,this.page,this.pageSize).then((list)=>{
					this.isLoading=false;
					if(list.length>0){
						if(this.page==1){
							this.list = [];
						}
						//如果是搜索出来的结果，需要高亮关键字
						if(keyword){
							for(let i in list){
								let tmp = list[i];
								list[i].title = list[i].title.replace(reg, ('<font class="keyword-high-light">' + keyword + '</font>'));
							}
						}
						this.list.push(...list);
						this.page = this.page + 1;
						this.switchSelected(this.list[0],0);
					}
				});
			},
			setTimer() {
				let node = document.getElementById("auto-textarea-input")
				if(document.activeElement == node)[
					
				]
				node.selectionStart = 3
				node.selectionEnd = 5
				node.focus()
				// 创建文字区域
				// const range1 = new Range();
				// range1.setStart(p, 0);
				// range1.setEnd(p, 10);
				// const highlight1 = new Highlight();
				// highlight1.add(range1);
				// CSS.highlights.set(`type-a`, highlight1);
					
				// this.page = 1;
				// this.$db.findNotes().then((list)=>{
					
				// });
				// this.$message.info('This is a normal messsage');
			},
			init() {
				this.mouse = {};
				const handle = this.$refs.handle;
				const app = document.getElementById("app");
				handle.onmousedown = (e) => {
					this.mouse.isDown = true;
					this.mouse.startX = e.pageX;
				};
				app.onmousemove = throttle(
					(e) => {
						if (!this.mouse.isDown) return;
						if (this.mouse.isDown) {
							let diffX = 0;
							if(this.sliderBarVisible==true){
								diffX = e.pageX - 200;
							}else{
								diffX = e.pageX;
							}
							// console.log(diffX);
							if (diffX < SIDER_WIDTH_DEFAULT || diffX > SIDER_WIDTH_MAX)
								return;
							this.siderWidth = diffX;
						}
					},
					100, {
						trailing: true,
						leading: true
					}
				);
				app.onmouseup = () => {
					this.mouse.isDown = false;
				};
			},
			addNote(type) {
				let newNote = {};
				if (type == 1) {
					newNote = {type:'markdown',title:'新笔记',content:''};
				}
				//切换到全部笔记界面
				this.$refs.sliderBar.toView('all');
				this.$db.insertNote(newNote).then((res)=>{
					this.list.unshift(res);
					this.switchSelected(res,0);
					if (type == 1) {
						this.$refs.markdown.createNewNote();
					}
					this.$refs.sliderBar.refreshNums();
				});
			},
			// confirmDelNote(){
			// 	let _this = this;
			// 	_this.delVisible = false;
			// 	_this.isShowMenu = false;
			// 	_this.$db.removeNote(_this.selected._id).then((res)=>{
			// 		_this.$refs.sliderBar.refreshNums();
			// 	});
			// 	_this.list.splice(_this.selected.idx, 1);
			// 	if(_this.list.length>0){
			// 		this.switchSelected(_this.list[0],0);
			// 	}
			// },
			confirmDelNote(){
				let _this = this;
				_this.delVisible = false;
				_this.isShowMenu = false;
				_this.$db.removeNote(_this.selected._id).then((res)=>{
					_this.$refs.sliderBar.refreshNums();
					_this.list.splice(_this.selected.idx, 1);
					if(_this.list.length<=_this.pageSize+1){
						_this.page = 2;
						_this.fetchNotes();
					}
				});
			},
			clear(){
				this.selected._id = '';
				this.selected.idx = 0;
				this.selected.type = '';
			},
			changeContent(val,render){
				if(val==this.selected.content){
					return;
				}
				let _this = this;
				this.selected.content = val;
				if(this.timerId) clearTimeout(this.timerId);
				this.timerId = setTimeout(()=>{
					let title = val.trim().length>0?_this.extractContent(render):'空笔记';
					title = title.length>30?title.substring(0,30):title;
					let content = _this.selected.content;
					_this.$db.updateNote(_this.selected._id,title,content);
					_this.list[this.selected.idx].content = val;
					if(this.keyword){
						let reg = new RegExp(this.keyword);
						_this.list[this.selected.idx].title = title.replace(reg, ('<font class="keyword-high-light">' + this.keyword + '</font>'));
					}else{
						_this.list[this.selected.idx].title = title;
					}
				},300);
			},
			extractContent(html) {
			    return new DOMParser()
			        .parseFromString(html, "text/html")
			        .documentElement.textContent;
			},
			handleListScroll(){
				const container = this.$refs.listContainer;
				const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight-30;
				if (isAtBottom && !this.isLoading) {
					if(this.timerId) clearTimeout(this.timerId);
					this.timerId = setTimeout(()=>{
						this.fetchNotes();
					},300);
				}
			},
			changeKeyword(){
				let _this = this;
				_this.page=1;
				if(this.timerId) clearTimeout(this.timerId);
				this.timerId = setTimeout(()=>{
					_this.fetchNotes(_this.keyword);
				},300);
			},
			contextmenu(note,idx,e){
				e.preventDefault();
				this.switchSelected(note,idx);
				this.fixedBoxStyleObject.left = e.clientX + 'px'
				this.fixedBoxStyleObject.top = e.clientY + 'px'
				this.isShowMenu = true
			},
			collect(){
				let _this = this;
				_this.selected.collect = true;
				_this.list[_this.selected.idx].collect = true;
				_this.$db.addCollect(_this.selected._id);
				_this.$refs.sliderBar.refreshNums();
				_this.isShowMenu = false;
			},
			removeCollect(){
				let _this = this;
				_this.isShowMenu = false;
				_this.selected.collect = false;
				_this.list[_this.selected.idx].collect = false;
				_this.$db.removeCollect(_this.selected._id);
				//如果是从收藏笔记中取消收藏，需要更新列表
				if(_this.sliderMenu=='collect'){
					_this.list.splice(_this.selected.idx, 1);
					if(_this.list.length>0){
						this.switchSelected(_this.list[0],0);
					}
				}
				_this.$refs.sliderBar.refreshNums();
			}
		}
	}
</script>

<style scoped>
	.slider-outline {
		position: relative;
		background: #ffffff;
		width: 270px;
		max-width: 450px;
		height: 100vh;
		/* border-right: 1px solid rgba(0, 0, 0, 0.15); */
	}

	.content {
		position: relative;
		background: #ffffff;
		height: 100vh;
		width: 540px;
	}

	.slider-outline .container {
		height: calc(100vh - 46px);
		overflow-y: auto;
		padding: 10px;
	}

	.slider-outline .container .item {
		cursor: default;
		color: rgba(0, 0, 0, .85);
		text-align: left;
		font-size: 12px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		user-select: none;
	}

	.slider-outline .container .selected {
		background-color: #1890ff66;
		border-radius: 6px;
		color: #000;
	}
	
	.slider-outline .container .selected.deleted {
		background-color: #d6d6d6;
		color: #000;
	}
	
	.slider-outline .container .deleted {
		color: rgba(0, 0, 0, .5);
		text-decoration: line-through;
	}

	.slider-outline .container .item:hover {
		/* background-color: #d6d6d6;
		border-radius: 6px;
		color: #000; */
	}
	
	.slider-outline .container .item .title {
		font-weight: bold;
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		padding: 8px 20px 8px 20px;
	}
	
	.slider-outline .container .item .time{
		padding: 0 20px 8px 20px;
	}

	.slider-outline .menu {
		-webkit-app-region: drag;
		user-select: none;
		padding: 0 10px;
		background: rgba(244, 244, 245, 0.95);
		height: 46px;
		line-height: 46px;
		font-weight: bold;
	}

	.slider-outline .menu img {
		user-select: none;
		width: 27px;
		height: 27px;
	}

	.slider-outline .split-handle {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 9;
		height: 100%;
		width: 5px;
		border-right: 1px solid rgba(0, 0, 0, 0.15);
		cursor: col-resize;
	}

	.content .menu {
		padding: 0 10px;
		background: rgba(244, 244, 245, 0.95);
		height: 46px;
		line-height: 46px;
		width: 100%;
	}

	.content .menu img {
		user-select: none;
		-webkit-app-region: no-drag;
		width: 27px;
		height: 27px;
	}

	.content .menu input {
		-webkit-app-region: no-drag;
	}

	.content .menu .btn-list {
		-webkit-app-region: drag;
		width: 20%;
		margin-right: 20px;
	}

	.type-box {
		position: absolute;
		color: #000;
		top: 46px;
		left: 50%;
		width: 300px;
		padding: 16px 20px;
		background: #fff;
		box-shadow: 0 6px 16px 1px rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
		border-radius: 5px;
		border: 1px solid #e9edf2;
		z-index: 20;
	}

	.type-box-mask {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 19;
		top: 0;
		left: 0;
	}

	.menu-desc {
		height: 24px;
		line-height: 24px;
		font-size: 14px;
	}

	.mt-20 {
		margin-top: 20px;
	}

	.menu-btn {
		-webkit-app-region: no-drag;
		width: 30px;
		height: 30px;
		border-radius: 4px;
	}

	.menu-btn:hover {
		background-color: #d6d6d6;
	}

	.menu-type-btn {
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
	}

	.menu-type-btn:hover {
		background-color: #d6d6d6;
	}

	.content .container {
		height: calc(100vh - 46px);
		overflow: hidden;
		user-select: none;
	}

	.fixed-box{
		position: fixed;
		color: #333;
		font-weight: 500;
		width: 160px;
		padding: 12px 8px;
		background: #fafafa;
		box-shadow: 0 6px 16px 1px rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
		border: 1px solid #eaeaea;
		z-index: 20;
		border-radius: 5px;
	}
	
	.fixed-box .item{
		cursor: pointer;
		border-bottom: 1px solid #efefef;
		text-align: left;
		padding-left: 8px;
		line-height: 38px;
		height: 38px;
	}
	
	.fixed-box .item:last-child{
		border: none;
	}
	
	.fixed-box .item:hover{
		background-color: #f1f1f1;
		border-radius: 5px;
	}
	
	/* 1. declare transition */
	.fade-move,
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	}
	
	/* 2. declare enter from and leave to state */
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: scaleY(0.01) translate(30px, 0);
	}
	
	/* 3. ensure leaving items are taken out of layout flow so that moving
	      animations can be calculated correctly. */
	.fade-leave-active {
		position: absolute;
	}
	.fade-box{
		position: relative;
	}
</style>