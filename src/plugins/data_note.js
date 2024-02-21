// datastore.js
import Datastore from 'nedb-promises'
import { ipcRenderer } from 'electron'

const basePath = await ipcRenderer.invoke('get-user-data-path')

const note = new Datastore({
    autoload: true,
	timestampData: true,
    // 指定数据库文件路径
    filename: basePath+'/note.db'
})

// const note_trash = new Datastore({
//     autoload: true,
// 	timestampData: true,
//     // 指定数据库文件路径
//     filename: basePath+'/note_trash.db'
// })

const db = {
	insertNote:function(newNote){
		newNote['deleted']=false;
		newNote = note.insert(newNote);
		return newNote;
	},
	findNotes:function(keyword,menu='all',page=1,pageSize=20){
		let params = {};
		if(keyword){
			let reg = new RegExp(keyword);
			params = {content:reg}
		}
		let skip = (page - 1) * pageSize;
		let list = null;
		if(menu=='all'){
			params['deleted']=false;
			list = note.find(params).sort({
				createdAt: -1
			}).skip(skip).limit(pageSize).exec((err, docs) => {
			  
			});
		}else if(menu=='collect'){
			params['collect'] = true;
			params['deleted'] = false;
			list = note.find(params).sort({
				createdAt: -1
			}).skip(skip).limit(pageSize).exec((err, docs) => {
			  
			});
		}else if(menu=='trash'){
			params['deleted'] = true;
			list = note.find(params).sort({
				createdAt: -1
			}).skip(skip).limit(pageSize).exec((err, docs) => {
			  
			});
		}
		return list;
	},
	countNotes:function(menu='all'){
		let total = 0;
		let params = {};
		if(menu=='all'){
			params['deleted']=false;
		}else if(menu=='collect'){
			params['collect'] = true;
			params['deleted'] = false;
		}else if(menu=='trash'){
			params['deleted'] = true;
		}
		total = note.count(params);
		return total;
	},
	removeNote:function(_id){
		return note.findOne({_id: _id}).then((res)=>{
			if(res.deleted==true){//永久删除
				return note.remove({_id:_id}, {multi: false});
			}else{//标记删除
				return note.update({_id: _id},{$set:{deleted:true}});
			}
		});
	},
	removeNoteConfirm:function(_id){
		note.remove({_id:_id}, {multi: false});
	},
	addCollect:function(_id){
		note.update({_id: _id},{$set:{collect:true}});
	},
	removeCollect:function(_id){
		note.update({_id: _id},{$set:{collect:false}});
	},
	updateNote:function(_id,title,content){
		note.update({_id: _id},{$set:{title:title,content:content}});
	}
}

export default db;