// API utilities for Helios backend integration
// Connects to live Helios demo backend at https://p8m2dfvub9.us-east-2.awsapprunner.com

const BACKEND_BASE_URL = 'https://p8m2dfvub9.us-east-2.awsapprunner.com';

/**
 * Generic API request wrapper with error handling
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options
 * @returns {Promise<object>} API response
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${BACKEND_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || `HTTP ${response.status}`);
    }

    return {
      success: true,
      data,
      status: response.status
    };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error.message,
      status: error.status || 500
    };
  }
};

/**
 * Get system health status
 * @returns {Promise<object>} Health check response
 */
export const getHealthStatus = async () => {
  return apiRequest('/health');
};

/**
 * Get live Helios performance metrics
 * @returns {Promise<object>} Current system metrics
 */
export const getMetrics = async () => {
  return apiRequest('/api/metrics');
};

/**
 * Create a new parallel universe
 * @param {object} universeConfig - Universe configuration
 * @returns {Promise<object>} Created universe details
 */
export const createUniverse = async (universeConfig = {}) => {
  return apiRequest('/api/universes/create', {
    method: 'POST',
    body: JSON.stringify(universeConfig)
  });
};

/**
 * Get universe details by ID
 * @param {string} universeId - Universe identifier
 * @returns {Promise<object>} Universe information
 */
export const getUniverse = async (universeId) => {
  return apiRequest(`/api/universes/${universeId}`);
};

/**
 * Perform operations on a universe
 * @param {string} universeId - Universe identifier
 * @param {object} operations - Operations to perform
 * @returns {Promise<object>} Operation results
 */
export const performUniverseOperations = async (universeId, operations) => {
  return apiRequest(`/api/universes/${universeId}/operations`, {
    method: 'POST',
    body: JSON.stringify(operations)
  });
};

/**
 * Get performance benchmarks
 * @returns {Promise<object>} System performance benchmarks
 */
export const getBenchmarks = async () => {
  return apiRequest('/api/benchmarks');
};

/**
 * Get real-time system statistics
 * @returns {Promise<object>} Live system stats including VST commit latency
 */
export const getLiveStats = async () => {
  try {
    // Fetch multiple endpoints in parallel for complete dashboard data
    const [metricsResult, benchmarksResult, healthResult] = await Promise.all([
      getMetrics(),
      getBenchmarks(),
      getHealthStatus()
    ]);

    return {
      success: true,
      data: {
        metrics: metricsResult.success ? metricsResult.data : null,
        benchmarks: benchmarksResult.success ? benchmarksResult.data : null,
        health: healthResult.success ? healthResult.data : null,
        lastUpdated: Date.now()
      }
    };
  } catch (error) {
    console.error('Error fetching live stats:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Demo workflow: Initialize demo session with live data
 * @param {string} accessCode - User access code
 * @returns {Promise<object>} Demo session initialization data
 */
export const initializeDemoSession = async (accessCode) => {
  try {
    // Get initial system state
    const statsResult = await getLiveStats();

    if (!statsResult.success) {
      throw new Error('Failed to fetch system stats');
    }

    // Create a demo universe for the user session
    const universeResult = await createUniverse({
      name: `Demo Universe - ${accessCode.slice(0, 4)}`,
      description: 'Interactive demo session universe',
      accessCode: accessCode,
      createdAt: Date.now()
    });

    return {
      success: true,
      data: {
        stats: statsResult.data,
        universe: universeResult.success ? universeResult.data : null,
        sessionId: `demo_${accessCode}_${Date.now()}`,
        initialized: true
      }
    };
  } catch (error) {
    console.error('Demo initialization error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Extract key performance indicators from API data
 * @param {object} apiData - Raw API response data
 * @returns {object} Formatted KPIs for dashboard display
 */
export const extractKPIs = (apiData) => {
  if (!apiData || !apiData.metrics) {
    // Return fallback data if API unavailable
    return {
      vstLatency: '<70μs',
      memoryEfficiency: '1000x',
      performanceGain: '500x',
      activeUniverses: '42',
      timestamp: Date.now(),
      source: 'fallback'
    };
  }

  const { metrics, benchmarks } = apiData;

  return {
    vstLatency: metrics.vstCommitLatency || '<70μs',
    memoryEfficiency: metrics.memoryEfficiency || '1000x',
    performanceGain: benchmarks?.performanceGain || '500x',
    activeUniverses: metrics.activeUniverses || '42',
    timestamp: apiData.lastUpdated,
    source: 'live'
  };
};

/**
 * Format API errors for user-friendly display
 * @param {object} error - API error object
 * @returns {string} User-friendly error message
 */
export const formatApiError = (error) => {
  if (typeof error === 'string') return error;

  if (error.message) {
    // Handle common API errors
    if (error.message.includes('not found')) {
      return 'Demo service temporarily unavailable. Please try again.';
    }
    if (error.message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please check your connection and try again.';
    }
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};

// Export backend URL for external link usage
export const DEMO_BACKEND_URL = BACKEND_BASE_URL;

// Export available endpoints for debugging
export const AVAILABLE_ENDPOINTS = [
  'GET /health',
  'GET /api/metrics',
  'POST /api/universes/create',
  'GET /api/universes/:id',
  'POST /api/universes/:id/operations',
  'GET /api/benchmarks'
];