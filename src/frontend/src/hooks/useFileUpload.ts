import { loadConfig } from "@caffeineai/core-infrastructure";
import { StorageClient } from "@caffeineai/object-storage";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useState } from "react";

async function buildStorageClient(): Promise<StorageClient> {
  const config = await loadConfig();
  const agent = HttpAgent.createSync({ host: config.backend_host });
  return new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );
}

interface FileUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export function useFileUpload() {
  const [state, setState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  async function uploadFile(file: File): Promise<string> {
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
