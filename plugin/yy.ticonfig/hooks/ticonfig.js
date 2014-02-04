var _ = require("underscore");

exports.cliVersion = '>=3.2';
 
exports.init = function (logger, config, cli, appc) {
  // credits to @fokkezb for pointing out the build.pre.contruct hook - https://github.com/dbankier/TiShadow/pull/213/
  cli.addHook('build.pre.construct', function (build, finished) {
    if (build.tiapp && build.tiapp.properties) {
      var keys = _.keys(build.tiapp.properties).filter(function(e) { return e.match("^cli\.");});
      keys.forEach(function(k) {
        build[k.replace(/^cli\./,'')] = build.tiapp.properties[k].value;
      });
    }
    finished();
  });
};
