const API_PROXY_BASE = "/backend-api";

export const apiUrl = (path: string) => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${API_PROXY_BASE}${normalizedPath}`;
};