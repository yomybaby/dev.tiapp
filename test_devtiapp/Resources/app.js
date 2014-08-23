// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var win1 = Titanium.UI.createWindow({  
    title:'Window',
    backgroundColor:'#fff'
});

var log = String.format('server_url : %s \n\n app_id : %s',
		Ti.App.Properties.getString('server_url'),
		Ti.App.id
	);
var label1 = Titanium.UI.createLabel({
	color:'#999',
	text: log,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

win1.open();