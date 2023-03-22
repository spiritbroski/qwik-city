// packages/qwik-city/adapters/cloudflare-pages/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
import fs from "fs";
import { join } from "path";
function cloudflarePagesAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: "cloudflare-pages",
    origin: (env == null ? void 0 : env.CF_PAGES_URL) ?? (env == null ? void 0 : env.ORIGIN) ?? "https://your.cloudflare.pages.dev",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config() {
      return {
        resolve: {
          conditions: ["webworker", "worker"]
        },
        ssr: {
          target: "webworker",
          noExternal: true
        },
        build: {
          ssr: true,
          rollupOptions: {
            output: {
              format: "es",
              hoistTransitiveImports: false
            }
          }
        },
        publicDir: false
      };
    },
    async generate({ clientOutDir, basePathname }) {
      const routesJsonPath = join(clientOutDir, "_routes.json");
      const hasRoutesJson = fs.existsSync(routesJsonPath);
      if (!hasRoutesJson && opts.functionRoutes !== false) {
        const routesJson = {
          version: 1,
          include: [basePathname + "*"],
          exclude: [basePathname + "build/*", basePathname + "assets/*"]
        };
        await fs.promises.writeFile(routesJsonPath, JSON.stringify(routesJson, void 0, 2));
      }
    }
  });
}
var cloudflarePagesAdaptor = cloudflarePagesAdapter;
export {
  cloudflarePagesAdapter,
  cloudflarePagesAdaptor
};
