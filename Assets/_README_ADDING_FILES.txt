If you do add files here and want them to be published to the 
electron app you need to list them in the .csproj file. 
They will then be published to somewhere like

    bin\desktop\ElectronNET.Host-win32-x64\resources\app\bin\Assets\<yourFileName>

When I try to use remote.app.getAppPath() to construct a path to 
those files (for use, for example, in providing a file:// protocol
path to the preload.js for the WebView), the path gets mangled
somewhere on the way to the WebView and ends up referring to
a folder under node_modules. Since I can't figure out what's going 
on there. I've been MANUALLY copying the Assets folder into 
places the javascript can access without having the path mangled, 
as described in the repo readme, like

    obj/{desktop,Host}/node_modules/Assets
    bin/desktop/*/resources/app/node_modules/Assets

If you're able to figure out what's going on here with file paths,
or even just automate the copying, please log an issue or send a PR at 
https://github.com/yoDon/Electron.NET-React-Typescript-MobX
so we can get the fix into the source repo
