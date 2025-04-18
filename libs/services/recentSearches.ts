
export class RecentSearches {
  static getRecentSearches() {
    const searches = localStorage.getItem('recent-searches');
    return searches ? JSON.parse(searches) : [];
  }
  
  static addRecentSearch(query) {
    const searches = this.getRecentSearches();
    // Remove if already exists to avoid duplicates
    const updated = [query, ...searches.filter(s => s !== query)].slice(0, 10);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
    return updated;
  }
  
  static clearRecentSearches() {
    localStorage.removeItem('recent-searches');
    return [];
  }
}