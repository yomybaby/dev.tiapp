# dev.tiapp

A titanium cli plugin to set a dfferent value of tiapp.xml base on deploy type or cli option.
dev.tiapp is inspired by [dbankier/ticonfig](https://github.com/dbankier/ticonfig). Thanks @dbankier!

## Installation

~~~
$ [sudo] npm install -g dev.tiapp --unsafe-perm
~~~
`--unsafe-perm` flag is required for hook installation.

## Usage

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
<property name="dev.server_url">http://__LOCAL_IP__:8080</property>
~~~

If you want to set ip of specific network interface, make a config file in your home path.
`~/.dev.tiapp.json`
~~~
{
    "networkInterface": "en0"
}
~~~

### Custom Prefix
Custom prefix is **not associated with dev/test/prod.**  
Use '--dev.tiapp' option with Titanium CLI. You can use prefix whatever you want instead of 'dev'.
~~~
ti build -p ios --tall --retina --dev.tiapp __dev__
~~~

in tiapp.xml
~~~
<id>test.tiapp</id>
<__dev__.id>__dev__.test.tiapp</__dev__.id>

<property name="server_url">http://www.myserver</property>
<property name="__dev__.server_url">http://this.is.custom.prefix</property>
~~~

#### Known Issue
- [#2](yomybaby/dev.tiapp/issues/2). : If cli.failOnWrongSDK is true and SDK version of project doesn't match Titanium CLI defautl version, Titanium CLI change a command. This make unofficial options to be deleted.
Set cli.failOnWrongSDK is true. If you want to build anoter version, user `--sdk` option.

    `ti build -p ios --sdk 3.4.0.GA`

## Why did I make this?
Somebody said that why should I use this instead of [Conditional Code](http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-ConditionalCode) such as `ENV_DEV` condition of Alloy.
Because some properties have to be set before build. (e.g. facebook app id on iOS)

## Change Log

### v0.0.3
- Custom Prefix

## Note
- You will need to understand what can be changed at the `build.pre.contruct` phase.
- Don't forget close tag with `dev.` prefix. :)
- If you have a problem or idea, please [make a issue](https://github.com/yomybaby/dev.tiapp/issues).

## Licence MIT
