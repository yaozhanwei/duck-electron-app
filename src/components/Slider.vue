<template>
	<transition name="slide-fade">
		<div class="slider" v-if="isFold">
			<div class="menu flex justify-end align-center">
				<div class="menu-btn flex align-center justify-center" @click="hide">
					<img src="../assets/icon-slider-bar.png" v-if="isFold"/>
				</div>
			</div>
			<div class="folder-container flex flex-column">
				<div @click="toView('all')" v-bind:class="menu=='all'?'nav-menu flex align-center selected':'nav-menu flex align-center'">
					<img src="../assets/slider/notes.png"/>全部笔记<span class="num">{{num.all}}</span>
				</div>
				<div @click="toView('collect')" v-bind:class="menu=='collect'?'nav-menu flex align-center selected':'nav-menu flex align-center'">
					<img src="../assets/slider/collect.png"/>个人收藏<span class="num">{{num.collect}}</span>
				</div>
				<div @click="toView('trash')" v-bind:class="menu=='trash'?'nav-menu flex align-center selected':'nav-menu flex align-center'">
					<img src="../assets/slider/trash.png"/>最近删除<span class="num">{{num.trash}}</span>
				</div>
				<div class="nav-menu flex align-center">
					<img src="../assets/slider/tag.png"/>标签
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Slider',
		components: {},
		data() {
			return {
				isFold:true,
				menu:'all',
				num:{
					'all':0,
					'collect':0,
					'trash':0
				}
			};
		},
		mounted() {
			this.refreshNums();
		},
		destroy() {

		},
		methods: {
			show(){
				this.isFold=true;
			},
			hide() {
				this.isFold=false;
				this.$emit('hide');
			},
			toView(menu){
				this.menu = menu;
				this.$emit("change", menu);
			},
			refreshNums(){
				this.$db.countNotes('all').then((res)=>{
					this.num.all = res;
				});
				this.$db.countNotes('collect').then((res)=>{
					this.num.collect = res;
				});
				this.$db.countNotes('trash').then((res)=>{
					this.num.trash = res;
				});
			}
		}
	}
</script>

<style scoped>
	.slider {
		position: relative;
		background: rgba(244, 244, 245, 0.95);
		width: 200px;
		height: 100vh;
		border-right: 1px solid #ededed;
	}

	.slider .menu {
		-webkit-app-region: drag;
		width: 100%;
		position: absolute;
		top: 0;
		right: 0;
		text-align: right;
		padding-right: 10px;
		height: 46px;
		line-height: 46px;
		z-index: 2;
	}

	.slider .menu img {
		width: 27px;
		height: 27px;
	}

	.folder-container {
		cursor: default;
		position: relative;
		padding-top: 50px;
		padding: 50px 10px 0 10px;
		color: rgba(0, 0, 0, .7);
		font-size: 14px;
	}

	.folder-container img {
		width: 24px;
		height: 24px;
		margin-right: 3px;
	}

	.folder-container .nav-menu {
		border-radius: 5px;
		padding: 2px 2px;
		margin-bottom: 2px;
		position: relative;
	}

	.folder-container .nav-menu:hover {
		background-color: #d6d6d6;
	}
	
	.folder-container .nav-menu.selected{
		background-color: #d6d6d6;
	}
	
	.folder-container .nav-menu .num{
		position: absolute;
		right: 10px;
		color: #999;
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

	.mybox-leave-active,
	.mybox-enter-active {
		transition: all 1.3s ease;
	}

	/* .mybox-leave-active,
	.mybox-enter {
		width: 0px !important;
	}

	.mybox-leave,
	.mybox-enter-active {
		width: 200px;
	} */
	.slide-fade-enter-active {
	  transition: all 0.3s ease-out;
	}
	
	.slide-fade-leave-active {
	  transition: all 0.3s ease-in;
	}
	
	.slide-fade-enter-from,
	.slide-fade-leave-to {
	  width: 0;
	  opacity: 0;
	}
</style>