const server = Bun.serve({
    port: 3000,
    fetch: handler,
});

console.log(`Server is running at ${server.url}`);
async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
        const build = await Bun.build({
            "entrypoints": ["./ts/index.ts"],
            "outdir": "./public",
            minify: true,
        });
        if (build.logs.length > 0) {
            console.log(build.logs);
        }

        const file = Bun.file("public/index.html");
        return new Response(file);
    }

    const path = `public${url.pathname}`;
    const file = Bun.file(path);
    return new Response(file);
}