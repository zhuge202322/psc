import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const wpApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async () => {
  // 添加 ?_embed 参数以获取特色图片等嵌入数据
  const response = await wpApi.get('/wp/v2/posts?_embed');
  return response.data;
};

export const getPages = async () => {
  const response = await wpApi.get('/wp/v2/pages');
  return response.data;
};

export const getMedia = async () => {
    const response = await wpApi.get('/wp/v2/media');
    return response.data;
};

export const getCategories = async () => {
    // 获取更多分类，防止分类过多导致找不到目标分类。添加时间戳防止缓存。
    const response = await wpApi.get(`/wp/v2/categories?per_page=100&t=${new Date().getTime()}`);
    return response.data;
};

export const getPostsByCategory = async (categorySlug: string) => {
    try {
        const categories = await getCategories();
        // 查找分类，忽略大小写
        const category = categories.find((c: any) => c.slug.toLowerCase() === categorySlug.toLowerCase());
        
        console.log(`[API] Searching for category slug: ${categorySlug}`);
        
        if (!category) {
            console.warn(`[API] Category with slug "${categorySlug}" not found. Available categories:`, categories.map((c:any) => c.slug));
            return [];
        }

        console.log(`[API] Found category ID: ${category.id} for slug: ${categorySlug}`);

        // 添加时间戳防止缓存
        const response = await wpApi.get(`/wp/v2/posts?categories=${category.id}&_embed&per_page=20&orderby=menu_order&order=asc&t=${new Date().getTime()}`);
        
        console.log(`[API] Fetched ${response.data.length} posts for category ${categorySlug}`);
        
        return response.data;
    } catch (error) {
        console.error('[API] Error fetching posts by category:', error);
        return [];
    }
};

export const getPaginatedPostsByCategory = async (categorySlug: string, page: number = 1, perPage: number = 5) => {
    try {
        const categories = await getCategories();
        const category = categories.find((c: any) => c.slug.toLowerCase() === categorySlug.toLowerCase());
        
        if (!category) {
            return { posts: [], totalPages: 0, totalPosts: 0 };
        }

        const response = await wpApi.get(`/wp/v2/posts?categories=${category.id}&_embed&per_page=${perPage}&page=${page}&t=${new Date().getTime()}`);
        
        return {
            posts: response.data,
            totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
            totalPosts: parseInt(response.headers['x-wp-total'] || '0')
        };
    } catch (error) {
        console.error('[API] Error fetching paginated posts:', error);
        return { posts: [], totalPages: 0, totalPosts: 0 };
    }
};

export const getPost = async (id: string) => {
    try {
        const response = await wpApi.get(`/wp/v2/posts/${id}?_embed`);
        return response.data;
    } catch (error) {
        console.error(`[API] Error fetching post ${id}:`, error);
        return null;
    }
};

export const getPageBySlug = async (slug: string) => {
    try {
        const response = await wpApi.get(`/wp/v2/pages?slug=${slug}&_embed`);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    } catch (error) {
        console.error(`[API] Error fetching page ${slug}:`, error);
        return null;
    }
};
