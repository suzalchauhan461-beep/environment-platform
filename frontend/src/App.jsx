import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/lessons/:slug" element={<LessonDetailPage />} />
          <Route path="/quiz/:slug" element={<QuizPage />} />
          <Route path="/quiz-result" element={<QuizResultPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
