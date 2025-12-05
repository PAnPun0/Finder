import $api from './instance';
import { transformUser } from './mapper'; // Импортируем маппер

export const api = {
  // 1. ВХОД ЧЕРЕЗ VK
  // router.POST("/login-vk")
  // Отправляем payload, получаем токен и ID пользователя
  authVk: (payload) => $api.post('/login-vk', { payload }),

  getUser: async (id) => {
    const response = await $api.get(`/user/${id}`);
    // Подменяем данные в ответе на "красивые"
    return { ...response, data: transformUser(response.data) };
  },

  // 2. Обновить профиль (с обратной трансформацией)
  updateUser: (id, form) => {
    // form - это { bio, education, tags: [], work: '' }
    // Превращаем в Go-структуру
    const payload = {
       Bio: form.bio,
       Education: form.education,
       Job: form.work, // Важно!
       // Если массив тегов есть, мапим его
       Interests: form.tags ? form.tags.map(t => ({ Name: t })) : []
    };
    return $api.put(`/user/${id}`, payload);
  },

  // 3. Лента (возвращает массив)
  getMatches: async (userId) => {
    const response = await $api.get(`/matches/${userId}`);
    // Если пришел массив пользователей
    if (Array.isArray(response.data)) {
        return { ...response, data: response.data.map(transformUser) };
    }
    return response;
  },

  // ... остальные методы (лайки и т.д.)
  addLike: (data) => $api.post('/like', {
      FromUserID: data.from_user_id, // Бэкенд ждет FromUserID (CamelCase или snake_case, уточни)
      ToUserID: data.to_user_id      // Точно по модели: ToUserID
  }),
};