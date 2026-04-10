/**
 * Mock Dashboard Data
 * Provides realistic mock data for all dashboard types
 * Ready for easy API integration with async functions
 */

// Simulated async delay for realistic API behavior
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============ ADMIN DASHBOARD DATA ============

export const getAdminDashboardData = async () => {
  await delay(500); // Simulate API call
  return {
    kpis: {
      totalUsers: 15234,
      activeUsers: 8921,
      totalRevenue: 543210.50,
      totalTransactions: 2847,
    },
    userGrowth: [
      { month: "Jan", users: 4200, newUsers: 320 },
      { month: "Feb", users: 5100, newUsers: 450 },
      { month: "Mar", users: 6300, newUsers: 580 },
      { month: "Apr", users: 7500, newUsers: 720 },
      { month: "May", users: 8200, newUsers: 850 },
      { month: "Jun", users: 8921, newUsers: 920 },
    ],
    revenueByCategory: [
      { category: "Sales", value: 245000, percentage: 45 },
      { category: "Services", value: 156000, percentage: 29 },
      { category: "Subscriptions", value: 98000, percentage: 18 },
      { category: "Other", value: 44210, percentage: 8 },
    ],
    usersByRole: [
      { role: "Admin", count: 45, color: "#1976d2" },
      { role: "Seller", count: 4230, color: "#2e7d32" },
      { role: "Buyer", count: 8540, color: "#0ea5e9" },
      { role: "Editor", count: 1850, color: "#f59e0b" },
      { role: "Viewer", count: 569, color: "#8b5cf6" },
    ],
    recentTransactions: [
      {
        id: "TXN001",
        user: "John Doe",
        amount: 2450.00,
        status: "completed",
        date: "2024-01-15",
        type: "purchase",
      },
      {
        id: "TXN002",
        user: "Jane Smith",
        amount: 1200.50,
        status: "pending",
        date: "2024-01-14",
        type: "refund",
      },
      {
        id: "TXN003",
        user: "Bob Johnson",
        amount: 3890.00,
        status: "completed",
        date: "2024-01-13",
        type: "purchase",
      },
      {
        id: "TXN004",
        user: "Alice Brown",
        amount: 750.25,
        status: "completed",
        date: "2024-01-12",
        type: "purchase",
      },
      {
        id: "TXN005",
        user: "Charlie Wilson",
        amount: 5200.00,
        status: "failed",
        date: "2024-01-11",
        type: "purchase",
      },
    ],
    platformHealth: {
      uptime: 99.97,
      apiResponseTime: 245,
      activeConnections: 4523,
      errorRate: 0.03,
    },
  };
};

// ============ BUYER DASHBOARD DATA ============

export const getBuyerDashboardData = async () => {
  await delay(500);
  return {
    kpis: {
      totalSpent: 12450.75,
      ordersCount: 47,
      savedItems: 23,
      loyaltyPoints: 5240,
    },
    spendingTrend: [
      { month: "Jan", spent: 1200, items: 8 },
      { month: "Feb", spent: 1850, items: 12 },
      { month: "Mar", spent: 2100, items: 14 },
      { month: "Apr", spent: 1950, items: 11 },
      { month: "May", spent: 2450, items: 16 },
      { month: "Jun", spent: 2900, items: 18 },
    ],
    ordersByStatus: [
      { status: "Delivered", count: 42, color: "#2e7d32" },
      { status: "In Transit", count: 3, color: "#f59e0b" },
      { status: "Processing", count: 1, color: "#0ea5e9" },
      { status: "Cancelled", count: 1, color: "#dc2626" },
    ],
    topCategories: [
      { category: "Electronics", spent: 4500, items: 12 },
      { category: "Fashion", spent: 3200, items: 18 },
      { category: "Books", spent: 1850, items: 23 },
      { category: "Home & Garden", spent: 1900, items: 8 },
      { category: "Sports", spent: 1000, items: 5 },
    ],
    recentOrders: [
      {
        id: "ORD001",
        title: "Wireless Headphones",
        price: 299.99,
        status: "delivered",
        date: "2024-01-10",
        seller: "TechStore Pro",
      },
      {
        id: "ORD002",
        title: "Winter Jacket",
        price: 189.99,
        status: "in-transit",
        date: "2024-01-12",
        seller: "FashionHub",
      },
      {
        id: "ORD003",
        title: "JavaScript Book Bundle",
        price: 79.99,
        status: "delivered",
        date: "2024-01-08",
        seller: "BookWorld",
      },
      {
        id: "ORD004",
        title: "Coffee Maker",
        price: 125.50,
        status: "processing",
        date: "2024-01-14",
        seller: "HomeGoods",
      },
    ],
    recommendations: [
      {
        id: "REC001",
        title: "Premium Smart Watch",
        price: 349.99,
        category: "Electronics",
        rating: 4.8,
      },
      {
        id: "REC002",
        title: "Running Shoes",
        price: 129.99,
        category: "Sports",
        rating: 4.6,
      },
      {
        id: "REC003",
        title: "Cookbook Collection",
        price: 49.99,
        category: "Books",
        rating: 4.7,
      },
    ],
  };
};

// ============ SELLER DASHBOARD DATA ============

export const getSellerDashboardData = async () => {
  await delay(500);
  return {
    kpis: {
      totalRevenue: 87450.00,
      totalSales: 342,
      activeListings: 156,
      averageRating: 4.7,
    },
    salesTrend: [
      { month: "Jan", revenue: 12000, orders: 48 },
      { month: "Feb", revenue: 14500, orders: 56 },
      { month: "Mar", revenue: 13800, orders: 52 },
      { month: "Apr", revenue: 15200, orders: 58 },
      { month: "May", revenue: 18950, orders: 68 },
      { month: "Jun", revenue: 13000, orders: 60 },
    ],
    topProducts: [
      {
        id: "PROD001",
        name: "Premium Headphones",
        sales: 125,
        revenue: 37375,
        rating: 4.8,
      },
      {
        id: "PROD002",
        name: "USB-C Cable Bundle",
        sales: 210,
        revenue: 15750,
        rating: 4.6,
      },
      {
        id: "PROD003",
        name: "Phone Case Set",
        sales: 195,
        revenue: 11700,
        rating: 4.5,
      },
      {
        id: "PROD004",
        name: "Screen Protector Pack",
        sales: 158,
        revenue: 4740,
        rating: 4.4,
      },
    ],
    revenueByCategory: [
      { category: "Electronics", value: 45000, percentage: 51 },
      { category: "Accessories", value: 28500, percentage: 33 },
      { category: "Bundles", value: 13950, percentage: 16 },
    ],
    recentOrders: [
      {
        id: "SALE001",
        buyer: "Customer A",
        product: "Premium Headphones",
        amount: 299.00,
        status: "shipped",
        date: "2024-01-14",
      },
      {
        id: "SALE002",
        buyer: "Customer B",
        product: "USB-C Cable Bundle",
        amount: 75.00,
        status: "delivered",
        date: "2024-01-13",
      },
      {
        id: "SALE003",
        buyer: "Customer C",
        product: "Phone Case Set",
        amount: 60.00,
        status: "shipped",
        date: "2024-01-12",
      },
      {
        id: "SALE004",
        buyer: "Customer D",
        product: "Screen Protector Pack",
        amount: 30.00,
        status: "pending",
        date: "2024-01-14",
      },
    ],
    customerSatisfaction: {
      avgRating: 4.7,
      reviewCount: 287,
      returnRate: 2.1,
      repeatCustomers: 68,
    },
  };
};

// ============ EDITOR DASHBOARD DATA ============

export const getEditorDashboardData = async () => {
  await delay(500);
  return {
    kpis: {
      totalEdits: 856,
      articlesPublished: 42,
      viewsGenerated: 154230,
      avgEngagementRate: 6.8,
    },
    publishingActivity: [
      { month: "Jan", published: 6, drafts: 8 },
      { month: "Feb", published: 7, drafts: 5 },
      { month: "Mar", published: 5, drafts: 10 },
      { month: "Apr", published: 8, drafts: 6 },
      { month: "May", published: 9, drafts: 7 },
      { month: "Jun", published: 7, drafts: 8 },
    ],
    contentMetrics: [
      {
        title: "Introduction to React Hooks",
        views: 28450,
        likes: 1842,
        comments: 234,
      },
      {
        title: "Advanced CSS Techniques",
        views: 22100,
        likes: 1450,
        comments: 189,
      },
      {
        title: "JavaScript Performance Tips",
        views: 18900,
        likes: 1320,
        comments: 156,
      },
      {
        title: "Web Design Trends 2024",
        views: 15400,
        likes: 980,
        comments: 128,
      },
    ],
    recentContent: [
      {
        id: "ART001",
        title: "Introduction to React Hooks",
        status: "published",
        views: 28450,
        date: "2024-01-05",
      },
      {
        id: "ART002",
        title: "Advanced CSS Techniques",
        status: "published",
        views: 22100,
        date: "2024-01-08",
      },
      {
        id: "ART003",
        title: "Draft Article",
        status: "draft",
        views: 0,
        date: "2024-01-14",
      },
      {
        id: "ART004",
        title: "Pending Review",
        status: "pending-review",
        views: 0,
        date: "2024-01-13",
      },
    ],
    engagementTrends: [
      { day: "Mon", likes: 245, comments: 34, shares: 18 },
      { day: "Tue", likes: 320, comments: 42, shares: 25 },
      { day: "Wed", likes: 280, comments: 38, shares: 21 },
      { day: "Thu", likes: 410, comments: 56, shares: 32 },
      { day: "Fri", likes: 520, comments: 68, shares: 44 },
      { day: "Sat", likes: 380, comments: 52, shares: 28 },
      { day: "Sun", likes: 320, comments: 45, shares: 24 },
    ],
  };
};

// ============ VIEWER DASHBOARD DATA ============

export const getViewerDashboardData = async () => {
  await delay(500);
  return {
    kpis: {
      articlesViewed: 324,
      readTime: 4250,
      savedItems: 47,
      contentLiked: 89,
    },
    viewingActivity: [
      { date: "2024-01-08", views: 12 },
      { date: "2024-01-09", views: 18 },
      { date: "2024-01-10", views: 15 },
      { date: "2024-01-11", views: 22 },
      { date: "2024-01-12", views: 19 },
      { date: "2024-01-13", views: 25 },
      { date: "2024-01-14", views: 20 },
    ],
    preferredCategories: [
      { category: "Technology", views: 125, timeSpent: 1250 },
      { category: "Design", views: 89, timeSpent: 845 },
      { category: "Business", views: 65, timeSpent: 620 },
      { category: "Lifestyle", views: 45, timeSpent: 380 },
    ],
    recentlyViewed: [
      {
        id: "ART001",
        title: "Introduction to React Hooks",
        category: "Technology",
        viewedAt: "2024-01-14",
        rating: 5,
      },
      {
        id: "ART002",
        title: "Modern UI Design Principles",
        category: "Design",
        viewedAt: "2024-01-13",
        rating: 4,
      },
      {
        id: "ART003",
        title: "Scaling Your Startup",
        category: "Business",
        viewedAt: "2024-01-12",
        rating: 5,
      },
      {
        id: "ART004",
        title: "Remote Work Best Practices",
        category: "Business",
        viewedAt: "2024-01-11",
        rating: 4,
      },
    ],
    savedItems: [
      {
        id: "SAVE001",
        title: "Advanced JavaScript Patterns",
        savedAt: "2024-01-10",
        status: "unread",
      },
      {
        id: "SAVE002",
        title: "UX Research Methods",
        savedAt: "2024-01-08",
        status: "reading",
      },
      {
        id: "SAVE003",
        title: "Leadership Tips for Managers",
        savedAt: "2024-01-05",
        status: "read",
      },
    ],
  };
};
