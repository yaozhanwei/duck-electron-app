<template>
	<div id="editor">
		<div class="flex toolbar align-center">
			<div class="flex align-center flex-full">
				<div @click="$clickL('bold')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705559787631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4790"><path d="M768.96 575.072c-22.144-34.112-54.816-56.8-97.984-68.032v-2.176c22.88-10.88 42.112-23.04 57.696-36.48 15.616-12.704 27.584-26.144 35.936-40.288 16.32-29.76 24.128-60.96 23.392-93.632 0-63.872-19.776-115.232-59.328-154.08-39.2-38.464-97.824-58.048-175.84-58.784H215.232v793.728H579.52c62.432 0 114.496-20.864 156.256-62.624 42.112-39.936 63.52-94.176 64.224-162.752 0-41.376-10.336-79.68-31.04-114.88zM344.32 228.832h194.912c43.904 0.736 76.224 11.424 96.896 32.128 21.056 22.144 31.584 49.184 31.584 81.12s-10.528 58.432-31.584 79.488c-20.672 22.848-52.992 34.304-96.896 34.304H344.32V228.832z m304.352 536.256c-20.672 23.584-53.344 35.744-97.984 36.48H344.32v-238.432h206.336c44.64 0.704 77.312 12.512 97.984 35.392 20.672 23.232 31.04 51.168 31.04 83.84 0 31.904-10.336 59.488-31.008 82.72z" p-id="4791" fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('italic')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560057902" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5010"><path d="M768 85.792h-288a32 32 0 0 0 0 64h96.32l-230.336 704H256a32 32 0 0 0 0 64h288a32 32 0 0 0 0-64h-93.728l230.528-704H768a32 32 0 0 0 0-64z" p-id="5011"  fill="#757575"></path></svg>
				</div>
				<div @mouseleave="$mouseleave_header_dropdown" @mouseenter="$mouseenter_header_dropdown" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560176730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5496"><path d="M736 96v384H288V96H192v864h96V544h448v416h96V96z" p-id="5497"  fill="#757575"></path></svg>
					<transition name="fade">
					    <div class="op-header popup-dropdown" :class="{'transition': transition}" v-show="s_header_dropdown_open" @mouseenter="$mouseenter_header_dropdown" @mouseleave="$mouseleave_header_dropdown">
					        <div title="#"  class="dropdown-item" @click.stop="$click_header('header1')"><span>一级标题</span></div>
					        <div title="## " class="dropdown-item" @click.stop="$click_header('header2')"><span>二级标题</span></div>
					        <div title="### " class="dropdown-item" @click.stop="$click_header('header3')"><span>三级标题</span></div>
					        <div title="#### " class="dropdown-item" @click.stop="$click_header('header4')"><span>四级标题</span></div>
					        <div title="##### " class="dropdown-item" @click.stop="$click_header('header5')"><span>五级标题</span></div>
					        <div title="###### " class="dropdown-item" @click.stop="$click_header('header6')"><span>六级标题</span></div>
					    </div>
					</transition>
				</div>
				<a-divider type="vertical" />
				<div @click="$clickL('underline')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560201327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5792"><path d="M512 811.296a312 312 0 0 0 312-312V89.6h-112v409.696a200 200 0 1 1-400 0V89.6h-112v409.696a312 312 0 0 0 312 312zM864 885.792H160a32 32 0 0 0 0 64h704a32 32 0 0 0 0-64z" p-id="5793"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('strikethrough')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560221294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6088"><path d="M893.088 501.792H125.344a32 32 0 0 0 0 64h767.744a32 32 0 0 0 0-64zM448 448h112V208h288V96H160v112h288zM448 640h112v288H448z" p-id="6089"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('superscript')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560265835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6384"><path d="M314.624 121.44L33.056 896h124.32l59.488-173.184h293.792L570.688 896h123.776L412.896 121.44H314.624zM250.88 618.688l112.096-338.4h2.112l112.096 338.4H250.88zM848 672L704 896h288zM774.496 249.472a334.24 334.24 0 0 0-73.472 80.064c-19.36 29.888-29.024 60.992-29.024 93.312h288v-80.096h-158.688c5.888-10.784 22.784-27.168 50.688-49.216 39.168-30.848 65.632-55.968 79.36-75.296 13.728-19.328 20.576-41.76 20.576-67.232 0-35.744-11.872-64.512-35.648-86.336S860.576 32 820.416 32c-77.376 0-124.896 34.272-142.528 102.848l95.52 15.424c5.888-25.472 19.584-38.208 41.152-38.208 10.784 0 19.712 3.424 26.816 10.304 7.104 6.848 10.656 15.904 10.656 27.168 0 14.688-5.504 29.152-16.544 43.36-11.04 14.208-31.36 33.056-60.992 56.576z" p-id="6385"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('subscript')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560286362" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6680"><path d="M960 96h-288l144 224zM314.624 89.44L33.056 864h124.32l59.488-173.184h293.792L570.688 864h123.776L412.896 89.44H314.624zM250.88 586.688l112.096-338.4h2.112l112.096 338.4H250.88zM833.312 886.784c5.888-10.784 22.784-27.168 50.688-49.216 39.168-30.848 65.632-55.968 79.36-75.296 13.728-19.328 20.576-41.76 20.576-67.232 0-35.744-11.872-64.512-35.648-86.336S892.576 576 852.416 576c-77.376 0-124.896 34.272-142.528 102.848l95.52 15.424c5.888-25.472 19.584-38.208 41.152-38.208 10.784 0 19.712 3.424 26.816 10.304 7.104 6.848 10.656 15.904 10.656 27.168 0 14.688-5.504 29.152-16.544 43.36-11.008 14.208-31.328 33.056-60.992 56.576a334.24 334.24 0 0 0-73.472 80.064c-19.36 29.888-29.024 60.992-29.024 93.312h288v-80.096h-158.688z" p-id="6681"  fill="#757575"></path></svg>
				</div>
				<a-divider type="vertical" />
				<div @click="$clickL('alignleft')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560312948" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6976"><path d="M96 128h832v96H96zM96 576h832v96H96zM96 352h576v96H96zM96 800h576v96H96z" p-id="6977"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('aligncenter')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560335617" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7272"><path d="M96 128h832v96H96zM96 576h832v96H96zM224 352h576v96H224zM224 800h576v96H224z" p-id="7273"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('alignright')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560368199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7568"><path d="M96 128h832v96H96zM96 576h832v96H96zM352 352h576v96H352zM352 800h576v96H352z" p-id="7569"  fill="#757575"></path></svg>
				</div>
				<a-divider type="vertical" />
				<div @click="$clickL('quote')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560400554" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7864"><path d="M128 472.896h341.344v341.344H128zM128 472.896L272.096 192h110.08l-144.128 280.896z"  fill="#757575" p-id="7865"></path><path d="M544 472.896h341.344v341.344H544zM544 472.896L688.096 192h110.08l-144.128 280.896z"  fill="#757575" p-id="7866"></path></svg>
				</div>
				<div @click="$clickL('ol')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560436865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8161"><path d="M99.232 288h54.848V86.848H63.264v54.88h35.968zM64 461.728h64l-64 91.424V608h128v-54.848H128l64-91.424v-54.88H64zM64 781.728h73.152V800H95.36v54.848h41.792v18.304H64V928h128v-201.152H64zM288 160h640v96H288zM288 464h640v96H288zM288 768h640v96H288z" p-id="8162"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('ul')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705564710565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10260"><path d="M288 160h640v96H288zM288 464h640v96H288zM288 768h640v96H288z" p-id="10261" fill="#757575"></path><path d="M160 208m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="10262" fill="#757575"></path><path d="M160 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="10263" fill="#757575"></path><path d="M160 816m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="10264" fill="#757575"></path></svg>
				</div>
				<div @mouseleave="$mouseleave_img_dropdown" @mouseenter="$mouseenter_img_dropdown" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560500688" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9053"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="9054"  fill="#757575"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="9055"  fill="#757575"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z" p-id="9056"  fill="#757575"></path></svg>
					<transition name="fade">
					    <div class="op-image popup-dropdown" :class="{'transition': transition}" v-show="s_img_dropdown_open" @mouseleave="$mouseleave_img_dropdown" @mouseenter="$mouseenter_img_dropdown">
					        <div  class="dropdown-item" @click.stop="$toggle_imgLinkAdd('imagelink')"><span>添加图片链接</span></div>
					        <div class="dropdown-item" style="overflow: hidden">
					            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="$imgAdd($event)" multiple="multiple"/>上传图片
					        </div>
					
					        <div
					            v-for="(item, index) in img_file"
					            v-if="item && item[1]"
					            class="dropdown-item dropdown-images"
					            :title="item[1].name"
					            :key="index"
					            @click.stop="$imgFileListClick(index)"
					        >
					            <span>{{item[1].name}}</span>
					            <button slot="right" type="button" @click.stop="$imgDel(index)"
					                    class="op-icon fa fa-mavon-times" aria-hidden="true"
					                    :title="d_words.tl_upload_remove"></button>
					            <!-- 缩略图展示 -->
					            <img class = "image-show" :class="{'transition': transition}" :src="item[1].miniurl" alt="none">
					        </div>
					    </div>
					</transition>
				</div>
				<div @click="$toggle_LinkAdd('link')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560478065" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8756"><path d="M910.496 213.536C804.16 82.208 611.488 61.952 480.128 168.32l-100.768 81.6 50.336 62.176 100.768-81.6a225.984 225.984 0 1 1 284.448 351.264l-107.968 87.424 50.336 62.176 107.968-87.424a305.984 305.984 0 0 0 45.248-430.4zM516.352 823.552a225.984 225.984 0 1 1-284.448-351.264l110.976-89.856-50.336-62.176-110.976 89.856C50.24 516.448 29.984 709.152 136.32 840.48c106.336 131.328 299.04 151.584 430.368 45.248l105.12-85.12-50.336-62.176-105.12 85.12z" p-id="8757"  fill="#757575"></path><path d="M676.16 353.28l51.232 61.44-343.552 286.304-51.2-61.44z" p-id="8758"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('table')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560587638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9657"><path d="M960 591.424V368.96c0-0.288 0.16-0.512 0.16-0.768S960 367.68 960 367.424V192a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v175.424c0 0.288-0.16 0.512-0.16 0.768s0.16 0.48 0.16 0.768v222.464c0 0.288-0.16 0.512-0.16 0.768s0.16 0.48 0.16 0.768V864a32 32 0 0 0 32 32h832a32 32 0 0 0 32-32v-271.04c0-0.288 0.16-0.512 0.16-0.768S960 591.68 960 591.424z m-560-31.232v-160H608v160h-208z m208 64V832h-208v-207.808H608z m-480-224h208v160H128v-160z m544 0h224v160h-224v-160zM896 224v112.192H128V224h768zM128 624.192h208V832H128v-207.808zM672 832v-207.808h224V832h-224z" p-id="9658"  fill="#757575"></path></svg>
				</div>
				<div @click="$clickL('code')" class="toolbar-btn flex align-center justify-center">
					<svg t="1705560523907" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9361"><path d="M300.224 224L32 525.76l268.224 301.76 71.776-63.776-211.552-237.984 211.552-237.984zM711.744 224L640 287.776l211.552 237.984L640 763.744l71.744 63.776 268.256-301.76z" p-id="9362"  fill="#757575"></path></svg>
				</div>
			</div>
		</div>
		<!-- <div v-if="showSearch" class="flex align-center find-box">
			<a-input size="small" id="innerSearch" v-model:value="keyword" @change="changeInnerKeyword" :allowClear="true" placeholder="查找">
				<template #suffix>
					<font color="#999">{{searchTotal}}</font>
				</template>
			</a-input>
			<img src="../../assets/arrow-left.png"/>
			<img src="../../assets/arrow-right.png"/>
			<div class="btn" @click="showSearch=false">完成</div>
		</div> -->
		<mavon-editor ref="editor" @showSearch="onShowSearch" @change="change" @blur="blur" :style="{height: height}" v-model:value="content" :fontSize="'16px'" :toolbarsFlag="false" :subfield="false" :previewBackground="'#ffffff'" :boxShadow="false" :codeStyle="codeStyle" :xssOptions="xssOptions">
		</mavon-editor>
		<div class="ft-footer-toolbar flex align-center">
			<a-tooltip placement="top">
				<template #title>
				  <span>预览</span>
				</template>
				<div @click="$click('navigation')" class="ft-toolbar-btn flex align-center justify-center">
					<svg t="1705560653536" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9953"><path d="M977.824 454.016C826.432 280.288 672.512 192 516.128 192c-156.384 0-310.304 88.288-461.696 262.016a112 112 0 0 0-1.632 145.248c138.24 165.984 293.088 250.24 463.328 250.24s325.088-84.256 463.328-250.24a112 112 0 0 0-1.632-145.248z m-47.552 104.32c-126.848 152.32-264.48 227.2-414.144 227.2s-287.296-74.88-414.144-227.2a48 48 0 0 1 0.704-62.24C243.008 335.072 380.8 256 516.128 256s273.152 79.072 413.44 240.064c15.488 17.792 15.776 44.16 0.704 62.272z" p-id="9954"  fill="#757575"></path><path d="M512 288a224 224 0 1 0 0 448 224 224 0 0 0 0-448z m-64 224a64 64 0 1 1 0.032-128.032A64 64 0 0 1 448 512z" p-id="9955"  fill="#757575"></path></svg>
				</div>
			</a-tooltip>
			<a-tooltip placement="top">
				<template #title>
				  <span>双栏模式</span>
				</template>
				<div @click="$click('subfield')" class="ft-toolbar-btn flex align-center justify-center">
					<svg t="1705574094773" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4684"><path d="M859.04 352H95.936a32 32 0 1 0 0 64h832a32 32 0 0 0 24.448-52.64l-189.088-224a32 32 0 0 0-48.896 41.28L859.04 352zM164.896 640H928a32 32 0 1 0 0-64H96a32 32 0 0 0-24.448 52.64l189.088 224a32 32 0 0 0 48.896-41.28L164.896 640z" fill="#757575" p-id="4685"></path></svg>
				</div>
			</a-tooltip>
		</div>
		<!--超链接输入弹窗-->
		<a-modal v-model:visible="linkVisible" title="添加链接" okText="确定" cancelText="取消" @ok="toolbar_left_addlink" :zIndex="9999">
			<div style="margin:20px 40px;">
				  <a-input v-model:value="link_text" placeholder="链接描述"/>
				  <a-input v-model:value="link_addr" placeholder="链接地址" style="margin-top:20px"/>
			</div>
		</a-modal>
		<!--图片链接输入弹窗-->
		<a-modal v-model:visible="s_img_link_open" title="添加图片链接" okText="确定" cancelText="取消" @ok="toolbar_left_addlink" :zIndex="9999">
			<div style="margin:20px 40px;">
				  <a-input v-model:value="link_text" placeholder="图片描述"/>
				  <a-input v-model:value="link_addr" placeholder="图片链接" style="margin-top:20px"/>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import { ipcRenderer } from 'electron'
	import mavonEditor from '../mavon/mavon-editor.vue'
	export default {
		name: 'Markdown',
		components: {mavonEditor},
		data() {
			return {
				codeStyle: "github",
				showSearch: false,
				searchTotal: 0,
				content: '',
				height: 0,
				num: 0,
				type:'',
				img_timer:null,
				header_timer: null,
				transition:true,
				img_file: [[0, null]],
				s_img_dropdown_open:false,
				s_img_link_open:false,
				s_header_dropdown_open: false,
				linkVisible:false,
				link_text:'',
				link_addr:'',
				link_type:'link',
				xssOptions:{
				    whiteList: {
				        span: ['style'],
						font: ['color'],
						strong: [],
				    }
				},
				timerId: null,
				keyword: '',
			};
		},
		mounted() {
			this.height = 'calc(100vh - 46px - 50px - 32px)';
		},
		created() {
			
		},
		destroy() {

		},
		methods: {
			init(content){
				this.content = content;
				this.$nextTick(() => {
				    this.$refs.editor.$emptyHistory();
				})
			},
			createNewNote() {
				this.content = '';
				this.$refs.editor.$clearValue();
				this.$nextTick(() => {
				    this.$refs.editor.textAreaFocus();
					this.$refs.editor.$emptyHistory();
				})
			},
			$click(_type) {
				this.type = _type;
			    this.$refs.editor.toolbar_right_click(_type, this);
			},
			$clickL(_type) {
			    this.$refs.editor.toolbar_left_click(_type, this);
			},
			$mouseleave_header_dropdown() {
			    let vm = this
			    this.header_timer = setTimeout(function() {
			        vm.s_header_dropdown_open = false
			    },200)
			},
			$mouseenter_header_dropdown() {
			    clearTimeout(this.header_timer)
			    this.s_header_dropdown_open = true
			},
			$click_header(_type) {
			    // 让父节点来绑定事件并
			    this.$refs.editor.toolbar_left_click(_type, this);
			    this.s_header_dropdown_open = false
			},
			toolbar_left_addlink(){
				this.$refs.editor.toolbar_left_addlink(this.link_type, this.link_text,this.link_addr, this);
				this.linkVisible = false;
				this.s_img_link_open = false;
			},
			// 工具栏功能图标click-----------------
			$mouseenter_img_dropdown() {
			    clearTimeout(this.img_timer)
			    this.s_img_dropdown_open = true
			},
			$mouseleave_img_dropdown() {
			    let vm = this
			    this.img_timer = setTimeout(function() {
			        vm.s_img_dropdown_open = false
			    },200)
			},
			$imgAddInner(pos, $file, isinsert) {
			    if (isinsert === undefined) isinsert = true;
			    var $vm = this;
			    if (this.__rFilter == null) {
			        // this.__rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
			        this.__rFilter = /^image\//i;
			    }
			    this.__oFReader = new FileReader();
			    this.__oFReader.onload = function (oFREvent) {
			        $vm.markdownIt.image_add(pos, oFREvent.target.result);
			        $file.miniurl = oFREvent.target.result;
			        if (isinsert === true) {
			            // 去除特殊字符
			            $file._name = $file.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g, '');
			
			            $vm.insertText($vm.getTextareaDom(),
			                {
			                    prefix: '![' + $file._name + '](' + pos + ')',
			                    subfix: '',
			                    str: ''
			                });
			        }
			    }
			    if ($file) {
			        var oFile = $file;
			        if (this.__rFilter.test(oFile.type)) {
			            this.__oFReader.readAsDataURL(oFile);
			        }
			    }
			},
			$imgFileAdd($file) {
			    this.img_file.push([++this.num, $file])
			    // this.$emit('imgAdd', this.num, $file);
				this.$refs.editor.$imgAdd(this.num, $file);
			    this.s_img_dropdown_open = false;
			},
			$imgFilesAdd($files) {
			    // valid means if the image_filter exist.
			    let valid = (typeof this.image_filter === 'function');
			    for (let i = 0; i < $files.length; i++) {
			        if (valid && this.image_filter($files[i]) === true) {
			            this.$imgFileAdd($files[i]);
			        } else if (!valid && $files[i].type.match(/^image\//i)) {
			            this.$imgFileAdd($files[i]);
			        }
			    }
			},
			$imgAdd($e) {
			    this.$imgFilesAdd($e.target.files);
			    $e.target.value = ''; // 初始化
			},
			$toggle_imgLinkAdd(type) {
			    this.link_type = type;
			    this.link_text = this.link_addr = '';
			    this.s_img_link_open = true;
			    this.s_img_dropdown_open = false;
			},
			$toggle_LinkAdd(type){
				this.link_type = type;
				this.link_text = this.link_addr = '';
				this.linkVisible = true;
			},
			change(val, render){
				if(typeof(val)=='string'){
					this.$emit('changeContent', val, render)
				}
			},
			blur(val){
				if(typeof(val)=='string'){
					this.$emit('blur', val)
				}
			},
			onShowSearch(){
				this.showSearch=true;
				this.$nextTick(() => {
				    document.getElementById('innerSearch').focus()
				})
			},
			changeInnerKeyword(){
				let _this = this;
				if(!_this.keyword){
					_this.searchTotal = '';
					return;
				}
				let reg = new RegExp(_this.keyword,'g');
				if(this.timerId) clearTimeout(this.timerId);
				this.timerId = setTimeout(()=>{
					let start = _this.content.search(reg);
					_this.searchTotal = (_this.content.match(reg)||[]).length;
					if(start<0){
						return;
					}
					let end = start+_this.keyword.length;
					let node = _this.$refs.editor.$refs.vNoteTextarea.$refs.vTextarea
					node.selectionStart = start
					node.selectionEnd = end
					node.focus();
				},300);
			}
		}
	}
</script>

<style scoped>
	#editor{
		position: relative;
		height: calc(100vh - 46px);
		width: 100%;
	}
	.toolbar{
		width: 100%;
		height: 50px;
	}
	.toolbar-btn{
		position: relative;
		cursor: pointer;
		padding: 8px 0;
		flex:1;
		border-radius: 4px;
	}
	.toolbar-btn .icon{
		width: 18px;
		height: 18px;
	}
	.toolbar-btn:hover{
		background-color: #d6d6d6;
	}
	.footer-toolbar{
		width: 100%;
		height: 28px;
	}
	.ft-toolbar-btn{
		cursor: pointer;
		padding: 8px 0;
		flex:1;
	}
	.ft-toolbar-btn .icon{
		width: 18px;
		height: 18px;
	}
	.ft-toolbar-btn:hover{
		background-color: #d6d6d6;
	}
	/**下拉菜单**/
	.popup-dropdown.transition{
	    transition: all 0.2s linear 0s;
	}
	.popup-dropdown.op-header {
	    left: -30px;
	    min-width: 90px;
	}
	.dropdown-item{
	    height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	    color: #606266;
	    position: relative;
	}
	.popup-dropdown {
	    position: absolute;
	    display: block;
	    background: #fff;
	    top: 38px;
	    left: -45px;
	    min-width: 130px;
	    z-index: 1600;
	    border: 1px solid #ebeef5;
	    border-radius: 4px;
	    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
	}
	.dropdown-item:hover{
		color: #303133;
		background-color: #e9e9eb;
	}
	.dropdown-item input{
	    position: absolute;
	    font-size: 100px;
	    right: 0;
	    top: 0;
	    opacity: 0;
	    cursor: pointer;
	}
	.find-box{
		margin:0 10px;
	}
	.find-box img{
		width: 14px;
		height: 14px;
		margin: 0 4px;
	}
	.find-box .btn{
		width: 56px;
		font-size: 12px;
		border: 1px solid rgb(117,117,117);
		border-radius: 5px;
	}
</style>
