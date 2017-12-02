If you do add files here and want them to be published to the 
electron app you need to list them in the .csproj file. 
They will then be published in _production_ builds to somewhere like

    bin\desktop\ElectronNET.Host-win32-x64\resources\app\bin\Assets\<yourFileName>

UNFORTUNATELY as of this writing there is an Electron.NET issue that causes these file
to NOT get published correctly when doing dev builds so you need to manually copy
the Assets folder to obj\Host\node_modules\electron\dist\resources\app\bin\Assets on a PC or 
to obj/Host/node_modules/electron/dist/Electron.app/Contents/Resources/app/bin/Assets on a Mac.
The folder and its contents don't get blown away by rebuilds, so you only have 
to repeat the process if you change the contents of one of the files under 
Assets.
