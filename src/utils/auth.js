// Authentication utilities for Helios Demo Access Control
// Implements access code validation and rate limiting

/**
 * Demo access codes configuration
 * In production, these would be stored securely and managed via admin panel
 */
const DEMO_ACCESS_CODES = {
  // VIP Access - High usage limits
  'HELIOS2024VIP': {
    user: { name: 'VIP User', tier: 'vip' },
    permissions: ['full_demo', 'performance_metrics', 'universe_management'],
    maxUsage: 1000,
    rateLimit: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
    description: 'Full access with performance metrics'
  },

  // Developer Access - Medium usage limits
  'DEV_PREVIEW_2024': {
    user: { name: 'Developer', tier: 'developer' },
    permissions: ['full_demo', 'performance_metrics'],
    maxUsage: 500,
    rateLimit: { requests: 50, windowMs: 60 * 1000 }, // 50 requests per minute
    description: 'Developer preview access'
  },

  // Standard Demo Access - Basic limits
  'DEMO_ACCESS_2024': {
    user: { name: 'Demo User', tier: 'standard' },
    permissions: ['basic_demo'],
    maxUsage: 100,
    rateLimit: { requests: 20, windowMs: 60 * 1000 }, // 20 requests per minute
    description: 'Standard demo access'
  },

  // Beta Tester Access
  'BETA_TESTER_2024': {
    user: { name: 'Beta Tester', tier: 'beta' },
    permissions: ['full_demo', 'beta_features'],
    maxUsage: 250,
    rateLimit: { requests: 30, windowMs: 60 * 1000 }, // 30 requests per minute
    description: 'Beta testing access with new features'
  },

  // Conference/Event Demo Codes
  'CONF2024_HELIOS': {
    user: { name: 'Conference Attendee', tier: 'conference' },
    permissions: ['demo_showcase'],
    maxUsage: 50,
    rateLimit: { requests: 15, windowMs: 60 * 1000 }, // 15 requests per minute
    description: 'Conference demonstration access'
  }
};

/**
 * Rate limiting storage (in production, use Redis or similar)
 */
const rateLimitStore = new Map();

/**
 * Usage tracking storage (in production, use database)
 */
const usageStore = new Map();

/**
 * Validates an access code
 * @param {string} accessCode - The access code to validate
 * @returns {Promise<{valid: boolean, message?: string, user?: object, permissions?: array}>}
 */
export const validateAccessCode = async (code) => {
  try {
    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    if (!code || typeof code !== 'string') {
      return {
        valid: false,
        message: 'Access code is required'
      };
    }

    // Normalize the code
    const normalizedCode = code.trim().toUpperCase();

    // Check if code exists
    const codeConfig = DEMO_ACCESS_CODES[normalizedCode];
    if (!codeConfig) {
      return {
        valid: false,
        message: 'Invalid access code. Please check your code and try again.'
      };
    }

    // Check if code is expired (24-hour demo window)
    const sessionKey = `session_${normalizedCode}`;
    const existingSession = localStorage.getItem(sessionKey);

    if (existingSession) {
      try {
        const session = JSON.parse(existingSession);
        if (session.expiresAt && session.expiresAt < Date.now()) {
          localStorage.removeItem(sessionKey);
          return {
            valid: false,
            message: 'Access code has expired. Please request a new code.'
          };
        }
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem(sessionKey);
      }
    }

    return {
      valid: true,
      user: codeConfig.user,
      permissions: codeConfig.permissions,
      config: codeConfig,
      message: `Welcome ${codeConfig.user.name}! Access granted.`
    };

  } catch (error) {
    console.error('Access code validation error:', error);
    return {
      valid: false,
      message: 'Validation service temporarily unavailable. Please try again.'
    };
  }
};

/**
 * Checks rate limiting for an access code
 * @param {string} accessCode - The access code to check
 * @returns {Promise<{allowed: boolean, usageCount: number, maxUsage: number, resetTime?: number}>}
 */
export const checkRateLimit = async (code) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const codeConfig = DEMO_ACCESS_CODES[normalizedCode];

    if (!codeConfig) {
      return {
        allowed: false,
        usageCount: 0,
        maxUsage: 0,
        message: 'Invalid access code'
      };
    }

    const now = Date.now();
    const usageKey = `usage_${normalizedCode}`;
    const rateLimitKey = `rate_${normalizedCode}`;

    // Get current usage count
    let currentUsage = usageStore.get(usageKey) || 0;

    // Check total usage limit
    if (currentUsage >= codeConfig.maxUsage) {
      return {
        allowed: false,
        usageCount: currentUsage,
        maxUsage: codeConfig.maxUsage,
        message: 'Usage limit exceeded for this access code'
      };
    }

    // Check rate limiting (requests per minute)
    const rateLimitData = rateLimitStore.get(rateLimitKey) || {
      requests: 0,
      resetTime: now + codeConfig.rateLimit.windowMs
    };

    // Reset rate limit window if expired
    if (now >= rateLimitData.resetTime) {
      rateLimitData.requests = 0;
      rateLimitData.resetTime = now + codeConfig.rateLimit.windowMs;
    }

    // Check if rate limit exceeded
    if (rateLimitData.requests >= codeConfig.rateLimit.requests) {
      const resetInMinutes = Math.ceil((rateLimitData.resetTime - now) / (60 * 1000));
      return {
        allowed: false,
        usageCount: currentUsage,
        maxUsage: codeConfig.maxUsage,
        resetTime: resetInMinutes,
        message: `Rate limit exceeded. Try again in ${resetInMinutes} minutes.`
      };
    }

    // Update counters
    rateLimitData.requests += 1;
    currentUsage += 1;

    rateLimitStore.set(rateLimitKey, rateLimitData);
    usageStore.set(usageKey, currentUsage);

    return {
      allowed: true,
      usageCount: currentUsage,
      maxUsage: codeConfig.maxUsage,
      rateLimitRemaining: codeConfig.rateLimit.requests - rateLimitData.requests
    };

  } catch (error) {
    console.error('Rate limit check error:', error);
    return {
      allowed: false,
      usageCount: 0,
      maxUsage: 0,
      message: 'Rate limiting service error'
    };
  }
};

/**
 * Increments usage counter for successful demo sessions
 * @param {string} accessCode - The access code
 * @param {number} increment - Number to increment by (default 1)
 */
export const incrementUsage = (code, increment = 1) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const usageKey = `usage_${normalizedCode}`;
    const currentUsage = usageStore.get(usageKey) || 0;
    usageStore.set(usageKey, currentUsage + increment);
  } catch (error) {
    console.error('Usage increment error:', error);
  }
};

/**
 * Gets current usage statistics for an access code
 * @param {string} accessCode - The access code
 * @returns {object} Usage statistics
 */
export const getUsageStats = (code) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const codeConfig = DEMO_ACCESS_CODES[normalizedCode];

    if (!codeConfig) {
      return { usageCount: 0, maxUsage: 0, percentage: 0 };
    }

    const usageKey = `usage_${normalizedCode}`;
    const usageCount = usageStore.get(usageKey) || 0;
    const percentage = Math.min(100, (usageCount / codeConfig.maxUsage) * 100);

    return {
      usageCount,
      maxUsage: codeConfig.maxUsage,
      percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
      tier: codeConfig.user.tier,
      permissions: codeConfig.permissions
    };
  } catch (error) {
    console.error('Usage stats error:', error);
    return { usageCount: 0, maxUsage: 0, percentage: 0 };
  }
};

/**
 * Validates user permissions for specific features
 * @param {array} userPermissions - User's permissions array
 * @param {string} requiredPermission - Required permission to check
 * @returns {boolean} Whether user has the required permission
 */
export const hasPermission = (userPermissions, requiredPermission) => {
  if (!userPermissions || !Array.isArray(userPermissions)) {
    return false;
  }
  return userPermissions.includes(requiredPermission) || userPermissions.includes('full_demo');
};

/**
 * Cleans up expired sessions and rate limit data
 * Should be called periodically in production
 */
export const cleanupExpiredData = () => {
  try {
    const now = Date.now();

    // Clean up expired rate limit entries
    for (const [key, data] of rateLimitStore.entries()) {
      if (data.resetTime && now >= data.resetTime + (60 * 60 * 1000)) { // 1 hour after reset
        rateLimitStore.delete(key);
      }
    }

    // Clean up expired sessions from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('session_')) {
        try {
          const session = JSON.parse(localStorage.getItem(key));
          if (session.expiresAt && session.expiresAt < now) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          // Invalid session data, remove it
          localStorage.removeItem(key);
        }
      }
    });

  } catch (error) {
    console.error('Cleanup error:', error);
  }
};

// Initialize cleanup interval (runs every 15 minutes)
if (typeof window !== 'undefined') {
  setInterval(cleanupExpiredData, 15 * 60 * 1000);
}

/**
 * Demo utility functions
 */
export const DEMO_CODES = {
  VIP: 'HELIOS2024VIP',
  DEVELOPER: 'DEV_PREVIEW_2024',
  STANDARD: 'DEMO_ACCESS_2024',
  BETA: 'BETA_TESTER_2024',
  CONFERENCE: 'CONF2024_HELIOS'
};

/**
 * Gets demo URL with proper authentication parameters
 * @param {string} accessCode - Valid access code
 * @param {object} session - User session object
 * @returns {string} Complete demo URL with auth parameters
 */
export const getDemoUrl = (accessCode, session) => {
  // Return the backend API base URL - frontend dashboard handles API calls internally
  const demoBaseUrl = process.env.REACT_APP_DEMO_URL || 'https://p8m2dfvub9.us-east-2.awsapprunner.com';
  return demoBaseUrl;
};