# dev.tiapp

A titanium cli plugin to set a dfferent value of tiapp.xml base on deploy type.  
dev.tiapp is inspired by [dbankier/ticonfig](https://github.com/dbankier/ticonfig). Thanks @dbankier!

## Installation

~~~
$ [sudo] npm install -g dev.tiapp --unsafe-perm
~~~
`--unsafe-perm` flag is required for hook installation.

## Usage

Then you can added the following, e.g. to your tiapp.xml file.

### Change tag value
~~~
  <id>com.licky.www</id>
  <dev.id>dev.co.licky.www</dev.id>
~~~
When development deploy(e.g. simulator), Your app id will be replace by value of dev.id.

~~~  
  <property name="server_url">http://www.myserver</property>
  <property name="dev.server_url">http://192.168.0.10:8080</property>

  <property name="ti.facebook.appid">12345xxxxxxxxx</property>
  <property name="dev.ti.facebook.appid">xxxxxxx56789</property>
~~~
When development deploy(e.g. simulator), `Ti.App.Properties.getString('server_url')` will return `http://http://192.168.0.10:8080`.  

### Local IP Placseholder
`__LOCAL_IP__` in value will be replaced by your local ip address. local ip address detected by [ipselector](https://www.npmjs.org/package/ipselector).

~~~
  <dev.property name="server_url">http://__LOCAL_IP__:8080</dev.property>
~~~

#### Why did I make this?
Somebody said that why should I use this instead of [Conditional Code](http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-ConditionalCode) such as `ENV_DEV` condition of Alloy.
Because some properties have to be set before build. (e.g. facebook app id on iOS)

## Note
- You will need to understand what can be changed at the `build.pre.contruct` phase.
- Don't forget close tag with `dev.` prefix. :)

## Licence MIT
