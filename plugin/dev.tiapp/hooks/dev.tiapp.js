var _ = require("underscore"),
    ipselector = require("ipselector");

var path = require('path');
var fs = require('fs');
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

exports.cliVersion = '>=3.2';

exports.init = function (logger, config, cli, appc) {
  //ip_selector
  cli.addHook('build.pre.construct', function(build, finished) {
		if (build.tiapp && build.tiapp.properties) {
			var ipProperties = _.filter(build.tiapp.properties,function(p,key){
				return p.value&&p.value.match?p.value.match(/__LOCAL_IP__/):false;
			});
			if(ipProperties.length){
        // existing tishadow config?
        var config;
        var config_path = path.join(home,'.dev.tiapp.json');
        if (fs.existsSync(config_path)) {
          config = require(config_path);
        }
				ipselector.selectOne({
            family : 'IPv4',
            internal : false,
            networkInterface : config && config.networkInterface? config.networkInterface:undefined
          },
          function(ip) {
            _.each(ipProperties, function(p, key) {
              p.value = p.value.replace(/__LOCAL_IP__/, ip);
            });
					finished();
				});
			}else{
				finished();
			}
		}
	});

  // prefix replacement
  cli.addHook('build.pre.construct', function (build, finished) {
    console.log(build.cli.argv);
    var force_prefix = build.cli.argv.dev?build.cli.argv.dev.tiapp:undefined;
    var prefixReg = new RegExp("^"+(force_prefix?force_prefix:'dev')+"\.");

    if (build.tiapp && build.tiapp.properties) {
      if(force_prefix || build.deployType !== "production"){

        // property
        var devKeys = Object.keys(build.tiapp['properties']).filter(function(e) { return e.match(prefixReg);});
        devKeys.forEach(function(k) {
          build.tiapp.properties[k.replace(prefixReg, '')].value = build.tiapp.properties[k].value;
        });

        // tag
        devKeys = Object.keys(build.tiapp).filter(function(e) { return e.match(prefixReg);});
        devKeys.forEach(function(k) {
          build.tiapp[k.replace(prefixReg, '')] = build.tiapp[k];
        });
      }
    }
    //finished();
  });
};
