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

Then use ```npm run build``` to build the React/Typescript "client-side" code from _src and publish it into wwwroot and use ```dotnet electronize start``` to build the C# code into an Electron app and start the neccessary development servers.

```bash
$ npm run build
$ dotnet electronize start
```

## NOTES

This sample is modeled on a static React frontend approach, connecting the frontend HTML to the backend server via Electron's built-in interprocess communication (ipc) calls. That said, the server-side dotnet code actually runs a full ASPNET MVC server, so if you prefer you can easily modify it to use ASPNET views to generate the HTML. In support of this, I left the Home View and Controller in place, and currently just have the Home View redirect the renderer from / to /index.html (which can be found in wwwroot after running ```npm run build``` and which contains the generated React code).

I've purposely kept the visual theming of the sample very simple (*cough* ugly) but I did include a React WebView wrapper because it's so common to want to use WebViews in Electron and they're tricky in React and trickier still when using React with Typescript.

TODO: 

[ ] Integrate some sort of css/scss management into the sample

[ ] Enable hot reload of the C# server code

[ ] Enable hot reload of the React client code, currently blocked by [50](https://github.com/Microsoft/TypeScript-React-Starter/issues/50)

[ ] Use strongly-typed SignalR messaging between client and server once SignalR is out of alpha on dot net core.

**Enjoy!**