// Эта функция превращает ответ Бэкенда в удобный для Фронта вид
export const transformUser = (goUser) => {
  if (!goUser) return null;

  return {
    id: goUser.ID,           // UUID (строка)
    name: goUser.Fio,        // Fio -> name
    age: goUser.Age,         // Age -> age
    bio: goUser.Bio,
    education: goUser.Education,
    job: goUser.Job,
    photo: goUser.Photo || null, // Если на бэке появится поле Photo
    
    // Превращаем массив объектов [{Name: "IT"}, {Name: "Sport"}] -> ["IT", "Sport"]
    tags: goUser.Interests ? goUser.Interests.map(i => i.Name) : [],
    
    // Доп. поля
    salary: goUser.Salary,
    gender: goUser.Gender,
  };
};

// Функция наоборот: Из Фронта в Бэкенд (для отправки формы)
export const transformToBackend = (reactUser) => {
  return {
    Fio: reactUser.name,
    Bio: reactUser.bio,
    Age: Number(reactUser.age),
    Education: reactUser.education,
    Job: reactUser.work, // У нас work, там Job
    
    // Превращаем ["IT"] -> [{Name: "IT"}]
    // Бэкендер должен настроить GORM так, чтобы он искал существующие интересы по имени
    Interests: reactUser.tags.map(tag => ({ Name: tag })),
  };
};