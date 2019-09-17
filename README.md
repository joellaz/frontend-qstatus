# Frontend Q-status

Frontend repository for Q-status application

## VSCode Settings

[Get settings](https://gist.github.com/joellaz/7b8d6771e6bdcb960f38b61d7de67469)

Optionally: install VSCode extensions

- EditorConfig for VSCode
- vscode-styled-components by Julien Poissonnier
- lit-plugin

### Install

```sh
npm install
npm install yc-battery

```

"EditorConfig for VS Code"

### Chrome browser without cors filter (mac)

```sh
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

### Chrome browser without cors filter (Windows)

```sh
- Right click on desktop, add new shortcut
- Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
- Click OK.

On Windows 10 command will be: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```

### Running the application

```sh
npm run start
```
