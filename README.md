# <img src="https://cloud.githubusercontent.com/assets/378023/15172388/b2b81950-1790-11e6-9a7c-ccc39912bb3a.png" width="60px" align="center" alt="ElectronNET-React-Typescript-MobX"> ElectronNET-React-Typescript-MobX  
  
When I read about [Electron.NET](https://github.com/ElectronNET/Electron.NET) (a variant of Electron with C# and dotnet core for the "server" process), I was hooked but wanted a React and Typescript front-end sample. That quest led to creating this repo which works on Windows, macOS and Linux operating systems.

---  
  
## Using
  
You'll need [Node.js (v.8.x)](https://nodejs.org) and [.NET Core SDK](https://www.microsoft.com/net/download/core) installed on your computer in order to start or build this app.

First download and install:

```bash
$ git clone https://github.com/yoDon/Electron.NET-React-Typescript-MobX.git
$ cd Electron.NET-React-Typescript-MobX
$ dotnet restore
$ npm install
```

Then use ```npm start``` to build the React/Typescript "client-side" code from _src into wwwroot,  build the C# code into an Electron app, and start the neccessary development servers to run the app, or use one of the more specific commands to perform just a part of the process.

| Command | Effect |
| ------- | ------ |
| ```npm start```  | build the javascript, then the C#, then launch the app |
| ```npm run js``` | build the javascript |
| ```npm run cs``` | build the C#, then launch the app |
| ```npm run cs-build``` | build the C# without launching the app |
| ```npm run js-watch``` | build the javascript and then watch the filesystem for changes |

## DEBUGGING

When the app is running in development mode, you can use the View menu to open the Chrome developer tools and inspect the renderer contents as you would with a normal webpage.

To debug the C# in Visual Studio, attach to your running application instance by opening the Debug Menu and clicking on "Attach to Process...". Select "SampleApp.exe" from the list to attach to. I currently get a ton of intellisense errors in Visual Studio when trying to connect to the app but debugging does actually seem to work fine even with all the red in the window (hopefully if others see similiar intellisense errors someone will figure out what's up and send a PR for either the code or this readme to fix it).

## NOTES

This sample is modeled on a static React frontend approach, connecting the frontend HTML to the backend server via Electron's built-in interprocess communication (ipc) calls. That said, the server-side dotnet code actually runs a full ASPNET MVC server, so if you prefer you can easily modify it to use ASPNET views to generate the HTML. In support of this, I left the Home View and Controller in place, and currently just have the Home View redirect the renderer from / to /index.html (which can be found in wwwroot after running ```npm run build``` and which contains the generated React code).

I've tried to keep this sample simple so there isn't a lot of extra stuff not everyone needs, but I did include a React WebView wrapper component because it's so common to want to use WebViews in Electron and they're tricky in React and trickier still when using React with Typescript.

## TODO

[ ] Use objects instead of strings for ipc message passing

[ ] Enable hot reload of the C# server code

[ ] Enable hot reload of the React client code, possibly blocked by [50](https://github.com/Microsoft/TypeScript-React-Starter/issues/50)

**Enjoy!**