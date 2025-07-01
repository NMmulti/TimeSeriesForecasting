import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Link } from 'react-router-dom'
import { 
  Upload, 
  Settings, 
  TrendingUp, 
  BarChart3, 
  Download,
  FileText,
  Database,
  Play,
  Clock,
  Target
} from 'lucide-react'

export default function Dashboard() {
  const quickActions = [
    {
      title: 'Загрузить данные',
      description: 'Загрузите CSV, Excel файлы или подключитесь к PostgreSQL',
      icon: Upload,
      link: '/upload',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Настроить модель',
      description: 'Выберите параметры и настройте конфигурацию модели',
      icon: Settings,
      link: '/config',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Запустить обучение',
      description: 'Обучите модели и получите прогнозы',
      icon: Play,
      link: '/training',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Анализ данных',
      description: 'Изучите статистику, аномалии и сезонность',
      icon: BarChart3,
      link: '/analysis',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ]

  const features = [
    {
      icon: Database,
      title: 'Множественные источники данных',
      description: 'Поддержка CSV, Excel файлов и прямое подключение к PostgreSQL'
    },
    {
      icon: Target,
      title: 'Автоматический выбор моделей',
      description: 'Интеллектуальный подбор оптимальных алгоритмов прогнозирования'
    },
    {
      icon: TrendingUp,
      title: 'Визуализация прогнозов',
      description: 'Интерактивные графики и диаграммы для анализа результатов'
    },
    {
      icon: Clock,
      title: 'Обработка временных рядов',
      description: 'Профессиональные инструменты для работы с временными данными'
    }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Добро пожаловать в систему прогнозирования временных рядов
        </h1>
        <p className="text-lg text-muted-foreground">
          Мощный инструмент для анализа и прогнозирования временных рядов
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} to={action.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                      <Icon size={24} />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Возможности системы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="text-primary" size={24} />
            <span>Начало работы</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <span>Загрузите ваши данные временных рядов в формате CSV, Excel или подключитесь к базе данных</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <span>Настройте параметры модели: выберите колонки даты, целевой переменной и ID</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <span>Запустите процесс обучения и получите прогнозы с визуализацией результатов</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <span>Экспортируйте результаты в удобном формате или сохраните в базу данных</span>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/upload">
              <Button className="bg-primary hover:bg-primary/90">
                Начать работу
                <Upload className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

