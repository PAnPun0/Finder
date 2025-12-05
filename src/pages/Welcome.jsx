export default function WelcomeScreen() {
  return (
    <div className="w-full h-screen flex flex-col justify-between px-6 py-10 bg-white">

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Любовь находится <br /> здесь
        </h1>
        <p className="text-sm text-gray-500 mt-3">
          Keep your files, documents, tools in one place.
        </p>
      </div>

      <div className="flex justify-center space-x-6 mt-6">
        <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
          
        </button>
        <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
          @
        </button>
        <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
          G
        </button>
      </div>

      {/* Нижние кнопки */}
      <div className="flex flex-col space-y-4">
        <button className="w-full py-4 bg-blue-600 text-white rounded-xl text-center text-base font-medium">
          Войти
        </button>

        <button className="w-full py-4 bg-gray-100 text-blue-600 rounded-xl text-center text-base font-medium">
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}