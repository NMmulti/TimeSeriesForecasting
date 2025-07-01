import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  Home, 
  Upload, 
  Settings, 
  TrendingUp, 
  BarChart3, 
  Download,
  Database,
  Play,
  FileText
} from 'lucide-react'
import './App.css'

// Import page components (to be created)
import Dashboard from './components/Dashboard'
import DataUpload from './components/DataUpload'
import ModelConfig from './components/ModelConfig'
import Training from './components/Training'
import Analysis from './components/Analysis'
import Export from './components/Export'

function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Главная', description: 'Дашборд' },
    { path: '/upload', icon: Upload, label: 'Загрузка данных', description: 'CSV, Excel, PostgreSQL' },
    { path: '/config', icon: Settings, label: 'Конфигурация', description: 'Настройка модели' },
    { path: '/training', icon: Play, label: 'Обучение', description: 'Запуск и мониторинг' },
    { path: '/analysis', icon: BarChart3, label: 'Анализ данных', description: 'Статистика и визуализация' },
    { path: '/export', icon: Download, label: 'Экспорт', description: 'Сохранение результатов' }
  ]

  return (
    <nav className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary mb-2">Logo</h1>
        <p className="text-sm text-muted-foreground">Прогнозирование временных рядов</p>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon size={20} />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function AppContent() {
  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<DataUpload />} />
          <Route path="/config" element={<ModelConfig />} />
          <Route path="/training" element={<Training />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

