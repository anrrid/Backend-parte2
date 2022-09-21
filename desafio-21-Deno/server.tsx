// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"
import React from "https://dev.jspm.io/react@16.13.1";
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";
import { contentTypeFilter, createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";
import { GetColorName } from "https://raw.githubusercontent.com/jeff3754/HexColorToColorName/master/src/index.ts";

const app = createApp();

const colores: string[] = []

app.post("/", contentTypeFilter("application/x-www-form-urlencoded"), async(req) => {
  const input = await req.formData();
  const color = input.value("color")
  if (colores.indexOf(color) === -1) colores.push(color);
  await req.redirect('/')
})

app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Mi servidor con Deno</title>
        </head>
        <body style={{ backgroundColor: "black"}}>
          <h1 style={{color: "white"}}>Deno 🦖</h1>
          <h1 style={{color: "white"}}>Por favor Ingrese un color</h1>
          <form method="POST" action="/">
            <label htmlFor="color" style={{color: "white"}}>Nuevo color: </label>
            <input type="color" name="color" id="color" />
            <input type="submit" value="Enviar" />
          </form>
          <br /><br />
          {colores.length > 0 && 
          <>
            <h2 style={{color: "white"}}>Tus colores seleccionados son:</h2>
            <ul>
              {colores.map((color, index) => {
                return (
                  <li key={index} style={{color, fontSize: "2rem"}}>
                    {GetColorName(color)}
                  </li>
                )
              })}
            </ul>
          </>
          }
        </body>
      </html>
    ),
  });
});
app.listen({ port: 8899 });