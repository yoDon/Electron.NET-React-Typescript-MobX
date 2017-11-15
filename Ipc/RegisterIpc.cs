using System;
using System.Collections.Generic;
using System.Linq;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Newtonsoft.Json.Linq;

namespace SampleApp
{
    public class RegisterIpc
    {
        public static RegisterIpc Impl = new RegisterIpc();
        private Dictionary<string,Action<string,Object>> mRegister = new Dictionary<string,Action<string,Object>>();
        private int counter = 0;
        private RegisterIpc()
        {
        }
        public void Register()
        {
            mRegister.Add("list-ipc",         (key,args) => { ListIpc(key);         });
            mRegister.Add("counter-delta",    (key,args) => { CounterDelta(key,args);});
            mRegister.Add("counter-delta-string",    (key,args) => { CounterDeltaString(key,args);});
            mRegister.Add("say-hello",        (key,args) => { SayHello(key,args);   });
            mRegister.Add("select-directory", (key,args) => { SelectDirectory(key); });
            mRegister.Add("save-dialog",      (key,args) => { SaveDialog(key);      });
            mRegister.Add("put-in-tray",      (key,args) => { PutInTray(key);       });
            mRegister.Add("async-msg",        (key,args) => { AsyncMsg(key);        });
            foreach (var item in mRegister)
            {
                Electron.IpcMain.On(item.Key,(args)=>{ item.Value(item.Key,args); });
            }
        }
        private void Reply(string ipc, params Object[] data)
        {
            var mainWindow = Electron.WindowManager.BrowserWindows.First();
            Electron.IpcMain.Send(mainWindow, ipc+"-reply", data);
        }
        private void ListIpc(string ipc)
        {
            var keys = new List<string>();
            foreach (var item in mRegister)
            {
                keys.Add(item.Key);
            }
            Reply(ipc, keys);
        }
        private void CounterDelta(string ipc, dynamic args)
        {
			// Note args comes in as a Newtonsoft.Json.Linq.JObject;
            int delta = args.delta;
            this.counter += delta;
            Reply(ipc, counter);
        }
        private void CounterDeltaString(string ipc, Object args)
        {
            string value = args as string;
            int delta = int.Parse(value);
            this.counter += delta;
            Reply(ipc, counter);
        }
        private void SayHello(string ipc, Object args)
        {
            string name = args as string;
            string response = (name == null || name.Length == 0) ? "Please tell me your name" : $"Hello {name}";
            Reply(ipc, response);
        }
        private async void SelectDirectory(string ipc)
        {
            var options = new OpenDialogOptions {
                Properties = new OpenDialogProperty[] {
                    OpenDialogProperty.openFile,
                    OpenDialogProperty.openDirectory
                }
            };
            var mainWindow = Electron.WindowManager.BrowserWindows.First();
            string[] files = await Electron.Dialog.ShowOpenDialogAsync(mainWindow, options);
            Reply(ipc, files);
        }
        private async void SaveDialog(string ipc) 
        {
            var options = new SaveDialogOptions
            {
                Title = "Save an Image",
                Filters = new FileFilter[]
                {
                    new FileFilter { Name = "Images", Extensions = new string[] {"jpg", "png", "gif" } }
                }
            };
            var mainWindow = Electron.WindowManager.BrowserWindows.First();
            var result = await Electron.Dialog.ShowSaveDialogAsync(mainWindow, options);
            Reply(ipc, result);
        }
        private void PutInTray(string ipc) 
        {
            if (Electron.Tray.MenuItems.Count == 0)
            {
                var menu = new MenuItem
                {
                    Label = "Remove",
                    Click = () => Electron.Tray.Destroy()
                };
                Electron.Tray.Show("/Assets/electron_32x32.png", menu);
                Electron.Tray.SetToolTip("Electron Demo in the tray.");
                Reply(ipc, true);
            }
            else
            {
                Electron.Tray.Destroy();
                Reply(ipc, false);
            }
        }
        private void AsyncMsg(string ipc)
        {
            Reply(ipc, "pong");
        }
    }
}