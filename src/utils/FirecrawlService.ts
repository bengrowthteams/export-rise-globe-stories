interface CachedTitle {
  url: string;
  title: string;
  timestamp: number;
}

export class FirecrawlService {
  private static CACHE_KEY = 'firecrawl_titles_cache';
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  private static getCache(): CachedTitle[] {
    const cached = localStorage.getItem(this.CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  }

  private static setCache(cache: CachedTitle[]): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
  }

  private static getCachedTitle(url: string): string | null {
    const cache = this.getCache();
    const cached = cache.find(item => item.url === url);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.title;
    }
    
    return null;
  }

  private static setCachedTitle(url: string, title: string): void {
    const cache = this.getCache();
    const existingIndex = cache.findIndex(item => item.url === url);
    const newItem: CachedTitle = {
      url,
      title,
      timestamp: Date.now()
    };

    if (existingIndex >= 0) {
      cache[existingIndex] = newItem;
    } else {
      cache.push(newItem);
    }

    // Keep only last 100 items
    if (cache.length > 100) {
      cache.splice(0, cache.length - 100);
    }

    this.setCache(cache);
  }

  static async fetchPageTitle(url: string): Promise<string> {
    // Check cache first
    const cachedTitle = this.getCachedTitle(url);
    if (cachedTitle) {
      return cachedTitle;
    }

    try {
      // Try multiple CORS proxies
      const proxies = [
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        `https://corsproxy.io/?${encodeURIComponent(url)}`,
        `https://cors-anywhere.herokuapp.com/${url}`
      ];

      for (const proxyUrl of proxies) {
        try {
          const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();
          const htmlContent = data.contents || data.body || data;
          
          if (typeof htmlContent === 'string') {
            // Extract title from HTML
            const titleMatch = htmlContent.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleMatch && titleMatch[1]) {
              const title = titleMatch[1].trim().replace(/\s+/g, ' ');
              this.setCachedTitle(url, title);
              return title;
            }
          }
        } catch (proxyError) {
          console.warn(`Proxy ${proxyUrl} failed:`, proxyError);
          continue;
        }
      }
    } catch (error) {
      console.error('All proxies failed for URL:', url, error);
    }

    // Fallback to URL-based title generation
    const fallbackTitle = this.generateFallbackTitle(url);
    this.setCachedTitle(url, fallbackTitle);
    return fallbackTitle;
  }

  private static generateFallbackTitle(url: string): string {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace(/^www\./, '');
      const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
      
      let displayTitle = domain;
      
      // Extract meaningful title from URL structure
      if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1];
        const cleanPath = lastPart
          .replace(/\.(html|htm|pdf|doc|docx)$/i, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        
        if (cleanPath.length > 3) {
          displayTitle = cleanPath;
        }
      }
      
      // Add domain context
      if (domain.includes('worldbank.org')) {
        return `${displayTitle} - World Bank`;
      } else if (domain.includes('unctad.org')) {
        return `${displayTitle} - UNCTAD`;
      } else if (domain.includes('imf.org')) {
        return `${displayTitle} - IMF`;
      } else if (domain.includes('wto.org')) {
        return `${displayTitle} - WTO`;
      } else if (domain.includes('oecd.org')) {
        return `${displayTitle} - OECD`;
      } else {
        const domainName = domain
          .replace(/\.(com|org|net|gov|edu)$/, '')
          .split('.')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
        return `${displayTitle} - ${domainName}`;
      }
    } catch (error) {
      return url;
    }
  }
}
