import $api from './instanse';

export const api = {
  // --- АВТОРИЗАЦИЯ ---
  login: (email, password) => $api.post('/auth/login', { email, password }),
  register: (email, password) => $api.post('/auth/register', { email, password }),
  authVk: (payload) => $api.post('/auth/vk', { payload }), // Отправляем то, что получили от VK

  // --- ПРОФИЛЬ ТЕКУЩЕГО ЮЗЕРА ---
  getMe: () => $api.get('/users/me'), // Получить мою анкету
  updateMe: (data) => $api.put('/users/me', data), // Обновить (о себе, интересы)

  // --- ЛЕНТА (FINDER) ---
  // params может быть: { lat: 55.7, lng: 37.6, radius: 10, gender: 'female' }
  getFeed: (params) => $api.get('/users/feed', { params }),

  // --- ДЕЙСТВИЯ ---
  likeUser: (userId) => $api.post("/users/${userId}/like"),
  dislikeUser: (userId) => $api.post("/users/${userId}/dislike"),
};

//я не умею делать апи запросы поэтому ии сдлала
// 1. Auth (Авторизация)

//     POST /api/auth/vk

//         Принимает: { "payload": "..." } (строка от VK ID SDK)

//         Возвращает: { "token": "jwt_token_here", "user": { ... } }

//     POST /api/auth/login (для обычного входа)

//     POST /api/auth/register

// 2. User Profile (Мой профиль)

//     GET /api/users/me

//         Заголовок: Authorization: Bearer <token>

//         Возвращает: Объект с моим именем, фото, bio, тегами.

//     PUT /api/users/me

//         Принимает: { "bio": "...", "tags": ["IT", "Music"], "photos": [...] }

// 3. Feed (Лента знакомств)

//     GET /api/users/feed

//         Заголовок: Authorization: Bearer <token>

//         Параметры (Query): ?limit=10&gender=female&min_age=18&max_age=25

//         Возвращает: Массив пользователей (как у нас в MOCK_USERS):
//     code JSON

        
//     [
//       {
//         "id": 105,
//         "name": "Алина",
//         "age": 21,
//         "photo": "url...",
//         "bio": "Текст...",
//         "distance": 5,
//         "tags": ["Music", "Art"]
//       }
//     ]

      

// 4. Actions (Свайпы)

//     POST /api/users/:id/like — Лайк пользователя с ID :id

//     POST /api/users/:id/dislike — Дизлайк