# ticonfig

A titanium cli plugin so that the build configuration can be read from the tiapp.xml file.

## Installation

~~~
$ [sudo] npm install -g ticonfig
~~~

## Usage

Then you can added the following, e.g. to your tiapp.xml file.

~~~
  <property name="cli.includeAllTiModules" type="bool">true</property>
~~~

You will need to understand what can be changed at the `build.pre.contruct` phase.

**To Do** - add a list of settings that can be changed and have an effect. 

## Licence MIT
