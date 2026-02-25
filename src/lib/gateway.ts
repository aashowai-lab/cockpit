const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:18800";

export async function gatewayFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Gateway error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getGatewayStatus() {
  try {
    const data = await gatewayFetch("/api/status");
    return { connected: true, ...data };
  } catch {
    return { connected: false };
  }
}

export async function getAgents() {
  try {
    return await gatewayFetch("/api/agents");
  } catch {
    return [];
  }
}

export async function getAgent(id: string) {
  return gatewayFetch(`/api/agents/${id}`);
}

export async function getSessions() {
  try {
    return await gatewayFetch("/api/sessions");
  } catch {
    return [];
  }
}

export async function getMemoryFiles() {
  try {
    return await gatewayFetch("/api/memory");
  } catch {
    return [];
  }
}

export async function getMemoryFile(path: string) {
  return gatewayFetch(`/api/memory/${encodeURIComponent(path)}`);
}

export async function getCronJobs() {
  try {
    return await gatewayFetch("/api/cron");
  } catch {
    return [];
  }
}

export async function getSkills() {
  try {
    return await gatewayFetch("/api/skills");
  } catch {
    return [];
  }
}

export async function getHealthCheck() {
  try {
    return await gatewayFetch("/api/health");
  } catch {
    return {
      gateway: { status: "disconnected", uptime: 0 },
      channels: [],
      models: [],
      errors: [],
    };
  }
}

export async function getLogs(limit = 20) {
  try {
    return await gatewayFetch(`/api/logs?limit=${limit}`);
  } catch {
    return [];
  }
}
