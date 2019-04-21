NOTE: This repo is no longer actively maintained. When combining C# with Electron, I'm currently https://github.com/yoDon/electron-react-typescript-dotnet which is both much simpler and a much smaller delta off of stock Electron and stock create-react-app packages.

# <img src="https://cloud.githubusercontent.com/assets/378023/15172388/b2b81950-1790-11e6-9a7c-ccc39912bb3a.png" width="60px" align="center" alt="ElectronNET-React-Typescript-MobX"> ElectronNET-React-Typescript-MobX  
  
When I read about [Electron.NET](https://github.com/ElectronNET/Electron.NET) (a variant of Electron with C# and dotnet core for the "server" process), I was hooked but wanted a React and Typescript front-end sample. That quest led to creating this repo which works on Windows, macOS and Linux operating systems.

---  
  
## Using
  
You'll need [Node.js (v.8.x)](https://nodejs.org) and [.NET Core SDK](https://www.microsoft.com/net/download/core) installed on your computer in order to start or build this app. I personally like to use VS Code when working on the HTML/JS bits and Visual Studio when working on the C# code (they play nice together), but that's just a personal preference.

First download and install:

```bash
$ git clone https://github.com/yoDon/Electron.NET-React-Typescript-MobX.git
$ cd Electron.NET-React-Typescript-MobX
$ dotnet restore
$ npm install
```

### Hack Hack Hack (begin)

In a moment you're going to build the app. First I need to describe a 
manual hack you'll need to do after building for the first time. The
WebView component uses a file called preload.js to control what Electron
functionality is exposed to external web pages loaded in the WebView.
The WebView component only loads the preload.js script from a file, and
there currently isn't a good way that I've found for getting that file
where it needs to be without manually putting it there (controlling what
extra files get packaged up with the Electron.NET app looks to be a
TODO item). For now, what I've been doing is doing a dev build of the app for
the first time I manually copy the ```./Assets folder``` to ```obj\Host\node_modules\electron\dist\resources\app\bin\Assets``` on a PC or 
to ```obj/Host/node_modules/electron/dist/Electron.app/Contents/Resources/app/bin/Assets``` on a Mac (I haven't confirmed for Linux but I'm guessing it matches the PC path).
The folder and its contents don't get blown away by rebuilds, so you only have 
to repeat the process if you change the contents of one of the files under 
```./Assets```. For production builds the files should currently get automatically copied into similar paths under ```bin/desktop``` but this isn't happening for dev builds.

Yup, that's not ideal, but Electron.NET is pretty new and I'm hopeful 
someone will figure out a better way to handle packaging of files
either internal to Electron.NET or external to it fairly soon.

### Hack Hack Hack (end)

Then use ```npm start``` to build the React/Typescript "client-side" code from _src into wwwroot, build the C# code into an Electron app, and start the neccessary development servers to run the app, or use one of the more specific commands listed below to perform just a part of the process.

AND REMEMBER, don't forget to manually copy the ```./Assets``` folder as described in the previous section and then re-run ```npm start``` to run the complete build of the app

| Command | Effect |
| ------- | ------ |
| ```npm start```  | build the javascript, then the C#, then launch the app |
| ```npm run js``` | build the javascript |
| ```npm run cs``` | build the C#, then launch the app |
| ```npm run cs-build``` | build the C# without launching the app |
| ```npm run js-watch``` | build the javascript and then watch the filesystem for changes |

## Debugging

When the app is running in development mode, you can use the View menu to open the Chrome developer tools and inspect the renderer contents as you would with a normal webpage. If you're on a page with an embedded WebView component, you can use the "Open Inner Dev Tools" button to open a separate copy of Chrome developer tools for the embedded page.

To debug the C# in Visual Studio, just attach to your running application instance by opening the Debug Menu, clicking on "Attach to Process...", and selecting "SampleApp.exe" from the list of processes.

## Organization

The ```_shared``` folder contains Typescript files shared between ```_site``` and ```_src```.

The ```_site``` folder contains the Typescript source of an optional external website to be loaded into the Electron app as a Hybrid Web App.

The ```_src``` folder contains the Typescript source of the Electron app's render content.

```npm run js``` builds ```_site``` into wwwsite and ```_src``` into wwwroot.

## Notes

This sample is modeled on a static React frontend approach, connecting the frontend HTML to the backend server via Electron's built-in interprocess communication (ipc) calls. That said, the server-side dotnet code actually runs a full ASPNET MVC server, so if you prefer you can easily modify it to use ASPNET views to generate the HTML. In support of this, I left the Home View and Controller in place, and currently just have the Home View redirect the renderer from / to /index.html (which can be found in wwwroot after running ```npm start``` or ```npm run js``` and which contains the generated React code).

I've tried to keep this sample simple so there isn't a lot of extra stuff not everyone needs, but I did include a React WebView wrapper component because it's so common to want to use WebViews in Electron and they're tricky in React and trickier still when using React with Typescript, and I included an example of 
how a WebView can be used to make a Hybrid Web App that loads an existing web page and grants it native
client functionality when the web page is running inside the electron app.

### Bug Bug Bug (begin)

At the time of this writing there's an [Electron.NET issue](https://github.com/ElectronNET/Electron.NET/issues/71) with OSX and Linux production 
builds only able to run once. Hopefully by the time you're reading this that issue
has been fixed.

### Bug Bug Bug (end)

## Todo

[ ] Enable hot reload of the C# server code

[ ] Enable hot reload of the React client code, possibly blocked by [50](https://github.com/Microsoft/TypeScript-React-Starter/issues/50)

**Enjoy!**
