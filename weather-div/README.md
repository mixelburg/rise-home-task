## How to use the script

### Option 1 (use the pre-built script)

add this to the page

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/mixelburg/rise-home-task@main/bin/weather-script.js"></script>
```

or paste this into the browser console

```javascript
document.body.insertBefore(Object.assign(document.createElement('div'), { id: 'weather-forecast' }), document.body.firstChild) && document.body.appendChild(Object.assign(document.createElement('script'), { type: 'module', src: 'https://cdn.jsdelivr.net/gh/mixelburg/rise-home-task@main/bin/weather-script.js' }));
```

### Option 2 (build from source)

1. run
    ```shell
    npm i 
    // or 
    bun i
    ```
2. build the code
    ```shell
    npm run build
    // or 
    bun build
    ```
3. inject the file from `dist` folder

```html

<script type="module" src="/path/to/file/artifact.js"></script>
```
