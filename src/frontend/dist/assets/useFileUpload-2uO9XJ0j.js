import { e as createLucideIcon, j as jsxRuntimeExports, d as cn, r as reactExports, l as loadConfig, k as HttpAgent, m as StorageClient } from "./index-Bl6dvI3W.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
async function buildStorageClient() {
  const config = await loadConfig();
  const agent = HttpAgent.createSync({ host: config.backend_host });
  return new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent
  );
}
function useFileUpload() {
  const [state, setState] = reactExports.useState({
    isUploading: false,
    progress: 0,
    error: null
  });
  async function uploadFile(file) {
    setState({ isUploading: true, progress: 0, error: null });
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const storageClient = await buildStorageClient();
      const { hash } = await storageClient.putFile(bytes, (pct) => {
        setState((s) => ({ ...s, progress: Math.round(pct) }));
      });
      const url = await storageClient.getDirectURL(hash);
      setState({ isUploading: false, progress: 100, error: null });
      return url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setState({ isUploading: false, progress: 0, error: message });
      throw err;
    }
  }
  function reset() {
    setState({ isUploading: false, progress: 0, error: null });
  }
  return { ...state, uploadFile, reset };
}
export {
  Ellipsis as E,
  Textarea as T,
  useFileUpload as u
};
