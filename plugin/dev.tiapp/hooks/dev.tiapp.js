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

  // credits to @fokkezb for pointing out the build.pre.contruct hook - https://github.com/dbankier/TiShadow/pull/213/
  cli.addHook('build.pre.construct', function (build, finished) {
    if (build.tiapp && build.tiapp.properties) {
      if(build.deployType !== "production"){

        // property
        var devKeys = Object.keys(build.tiapp['properties']).filter(function(e) { return e.match("^dev\.");});
        devKeys.forEach(function(k) {
          build.tiapp.properties[k.replace(/^dev\./, '')].value = build.tiapp.properties[k].value;
        });

        // tag
        devKeys = Object.keys(build.tiapp).filter(function(e) { return e.match("^dev\.");});
        devKeys.forEach(function(k) {
          build.tiapp[k.replace(/^dev\./, '')] = build.tiapp[k];
        });
      }
    }
    finished();
  });
};
