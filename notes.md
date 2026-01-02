# project init

create initial image
```shell
    podman build -t node-tmp .
```
> create a `tmp` folder 

run the container
```shell
    podman run -d -p 8080:8080 --name node-tmp-c -v tmp:/workspace:rw,Z node-tmp
```

```shell
npm create vite@latest
npm install react-router-dom
npm install bootstrap
```

`vite.config.ts`
```json
    host: true, // or '0.0.0.0'
```


