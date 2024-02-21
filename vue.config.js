const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
	hot: true // 启用热模块更换功能
  },
  pluginOptions:{
	  electronBuilder:{
		  nodeIntegration: true,
		  builderOptions:{
			  "appId": "yaozw.app.duck",
			  "productName": "Duck",
			  "copyright": "Copyright © 2024 yaozw",
			  "directories": {
			    "buildResources": "build",
			    "output": "dist"
			  },
			  "win": {
			    "target": [
			      "msi",
			      "nsis"
			    ],
			    "icon": "build/icons/icon.ico"
			  },
			  "nsis": {
			    "oneClick": false,
			    "language": "2052",
			    "perMachine": true,
			    "allowToChangeInstallationDirectory": true
			  },
			  "mac": {
			    "target": [
			      "dmg",
			      "zip"
			    ],
			    "category": "public.app-category.utilities"
			  },
			  "dmg": {
			    "icon": "build/icons/icon.icns",
			    "iconSize": 100,
			    "contents": [
			      {
			        "x": 380,
			        "y": 180,
			        "type": "link",
			        "path": "/Applications"
			      },
			      {
			        "x": 130,
			        "y": 180,
			        "type": "file"
			      }
			    ],
			    "window": {
			      "width": 540,
			      "height": 380
			    }
			  }
		  }
	  }
  }
})
