# Parent application

Demonstrate example of multicomponents application with navigation via Router in child and parent.
There are 2 versions are available

 - for ui5 core 1.52 - with parent routes (see git tag `example_1`)
 - for ui5 core 1.65 - with loading child component using Router (see git tag `example_2`)

# How to setup

1. Install Node.js (https://nodejs.org/en/download/package-manager)
2. Install grunt `npm install -g grunt-cli`
3. Install ui5-cli `npm install -g @ui5/cli`
4. Install packages (based on package.json) - `npm install`

# Grunt config

To use "build" and "deploy" tasks the '.env' file have to be fullfieled based on example (.env.example).

# How to test multiplecomponent application

There is predefinded grunt tsak - 'server'.

>command line: grunt server

**Note**: local server take a UI5 resources from configured path localy (see `ui5.yaml` - `C:/SAPUI5/1.65.16/resources`), please [download](https://tools.hana.ondemand.com/#sapui5) the resources first

**Note**: local server is based on UI5-Tooling and can be started using command - 'ui5 serve'

Server will be started at:

>localhost:3040/3041 (3040 - by default, can be changed in `ui5.yaml`)
