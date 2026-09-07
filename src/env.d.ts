/// <reference types="astro/client" />

interface Window {
	pagefind?: {
		search: (term: string, options?: { excerptLength?: number }) => Promise<{
			results: Array<{
				data: () => Promise<{ url: string; excerpt: string; meta: { title?: string } }>;
			}>;
		}>;
	};
}
