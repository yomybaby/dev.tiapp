var _ = require("underscore"),
    ipselector = require("ipselector");

exports.cliVersion = '>=3.2';
 
exports.init = function (logger, config, cli, appc) {
  //ip_selector
  cli.addHook('build.pre.construct', function(build, finished) {
		if (build.tiapp && build.tiapp.properties) {
			var ipProperties = _.filter(build.tiapp.properties,function(p,key){
				return p.value&&p.value.match?p.value.match(/__IP_ADDRESS__/):false;
			});
			if(ipProperties.length){
				ipselector.selectOne({
            family : 'IPv4',
            internal : false
          },
          function(ip) {
					_.each(ipProperties, function(p, key) {
						p.value = p.value.replace(/__IP_ADDRESS__/, ip);
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
      // cli.xxx
      var keys = _.keys(build.tiapp.properties).filter(function(e) { return e.match("^cli\.");});
      keys.forEach(function(k) {
        build[k.replace(/^cli\./,'')] = build.tiapp.properties[k].value;
      });

      // dev.xxx
      if(build.deployType !== "production"){
        var devKeys = Object.keys(build.tiapp.properties).filter(function(e) { return e.match("^dev\.");});
        devKeys.forEach(function(k) {
          build.tiapp.properties[k.replace(/^dev\./, '')].value = build.tiapp.properties[k].value;
        });
      }
    }
    finished();
  });
};
