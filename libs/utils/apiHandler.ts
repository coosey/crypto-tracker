import { NextApiRequest, NextApiResponse } from 'next';

interface ApiHandlerConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  cacheConfig?: {
    enabled?: boolean;
    sMaxAge?: number;
    staleWhileRevalidate?: number;
  };
  queryDefaults?: Record<string, string | number>;
  requiredParams?: string[];
};

function urlQueryBuilder(req: NextApiRequest, urlBuilder: string) {
  if (Object.keys(req.query).length === 0) return;
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (Array.isArray(value)) {
      value.forEach(v => queryParams.append(key, v));
    } else if (value) {
      queryParams.append(key, value as string);
    }
  }
  urlBuilder += `?${queryParams.toString()}`;
};

export function createApiHandler<T>(config: ApiHandlerConfig) {
  return async function handler(
    req: NextApiRequest,
    res: NextApiResponse<T | { error: string }>
  ) {
    try {
      if (config.cacheConfig?.enabled !== false) {
        res.setHeader(
          'Cache-Control',
          `public, s-maxage=${config.cacheConfig?.sMaxAge ?? 1800}, stale-while-revalidate=${config.cacheConfig?.staleWhileRevalidate ?? 3600}`
        );
      }

      // Handle query parameters with defaults
      const query = {
        ...config.queryDefaults,
        ...req.query,
      };

      // Validate required parameters
      if (config?.requiredParams) {
        const missingParams = config?.requiredParams?.filter?.(
          param => !query?.[param]
        );
        if (missingParams.length > 0) {
          return res.status(400).json({
            error: `Missing required parameters: ${missingParams.join(', ')}`,
          });
        }
      }

      // Build final URL
      let finalUrl = config.url;
      // Replace path parameters if they exist in the URL i.e. /coins/{id}/market_chart
      if (config.url.includes('{') && req.query) {
        for (const [key, value] of Object.entries(req.query)) {
          if (config.url.includes(`{${key}}`)) {
            finalUrl = finalUrl.replace(`{${key}}`, value as string);
            delete req.query[key];
          }
        }
      }
      // Then append query parameters
      if (Object.keys(req.query).length > 0) {
        urlQueryBuilder(req, finalUrl);
      }

      const response = await fetch(finalUrl, {
        method: config.method || 'GET',
        headers: {
          'content-type': 'application/json',
          ...config.headers,
        },
      });

      if (!response.ok) {
        throw {
          status: response.status,
          message: `API request failed with status ${response.status}`,
        };
      }
      let data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      console.error('API handler error:', error);
      res.status((error as any)?.status || 500).json({
        error: (error as Error)?.message || 'An unknown error occurred',
      });
    }
  };
}