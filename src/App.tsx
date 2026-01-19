import "./App.css";
import { CommentsSection } from "./components";

export const App = () => {
  const initialComments = [
    {
      id: 1,
      text: "Отличный пост! Спасибо за полезную информацию.",
      timestamp: new Date("2024-01-18T10:30:00"),
    },
    {
      id: 2,
      text: "Интересная точка зрения. А есть ли какие-то исследования на эту тему?",
      timestamp: new Date("2024-01-18T14:45:00"),
    },
  ];

  return (
    <div className="app">
      <div className="app-container">
        <h1>Демонстрация хуков useOptimistic и useActionState</h1>
        <p className="subtitle">
          Комментарии добавляются оптимистично, затем синхронизируются с
          сервером
        </p>

        <CommentsSection initialComments={initialComments} />
      </div>
    </div>
  );
};

export default App;
