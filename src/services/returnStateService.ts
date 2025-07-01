
interface ReturnState {
  selectedSectors: string[];
  countryStories: any;
  selectedSector: any;
  country: string;
  sector: string;
  timestamp: number;
}

class ReturnStateService {
  private static readonly STORAGE_KEY = 'caseStudyReturnState';

  static saveReturnState(state: {
    selectedSectors: string[];
    countryStories?: any;
    selectedSector?: any;
    country: string;
    sector: string;
  }): void {
    const returnState: ReturnState = {
      ...state,
      timestamp: Date.now()
    };
    
    console.log('ReturnStateService - Saving return state:', returnState);
    
    // Store in both session storage and local storage for reliability
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(returnState));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(returnState));
  }

  static getReturnState(): ReturnState | null {
    // Try session storage first, then local storage
    const sessionData = sessionStorage.getItem(this.STORAGE_KEY);
    const localData = localStorage.getItem(this.STORAGE_KEY);
    
    const data = sessionData || localData;
    
    if (!data) {
      console.log('ReturnStateService - No return state found');
      return null;
    }

    try {
      const returnState = JSON.parse(data) as ReturnState;
      console.log('ReturnStateService - Retrieved return state:', returnState);
      
      // Check if state is not too old (1 hour max)
      const oneHour = 60 * 60 * 1000;
      if (Date.now() - returnState.timestamp > oneHour) {
        console.log('ReturnStateService - Return state expired, clearing');
        this.clearReturnState();
        return null;
      }
      
      return returnState;
    } catch (error) {
      console.error('ReturnStateService - Failed to parse return state:', error);
      this.clearReturnState();
      return null;
    }
  }

  static clearReturnState(): void {
    console.log('ReturnStateService - Clearing return state');
    sessionStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static hasReturnState(): boolean {
    return this.getReturnState() !== null;
  }
}

export default ReturnStateService;
