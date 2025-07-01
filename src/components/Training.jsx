import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Play, 
  Pause, 
  Square, 
  TrendingUp, 
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function Training() {
  const [trainingStatus, setTrainingStatus] = useState('idle') // idle, running, completed, error
  const [progress, setProgress] = useState(0)
  const [currentModel, setCurrentModel] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0)

  // Mock training data
  const [modelResults, setModelResults] = useState([
    { 
      model: 'Auto ARIMA', 
      status: 'completed', 
      mae: 2.45, 
      mape: 8.2, 
      rmse: 3.12, 
      r2: 0.89,
      trainingTime: '2m 15s',
      rank: 2
    },
    { 
      model: 'Prophet', 
      status: 'completed', 
      mae: 2.12, 
      mape: 7.1, 
      rmse: 2.89, 
      r2: 0.92,
      trainingTime: '3m 42s',
      rank: 1
    },
    { 
      model: 'ETS', 
      status: 'completed', 
      mae: 2.78, 
      mape: 9.5, 
      rmse: 3.45, 
      r2: 0.85,
      trainingTime: '1m 33s',
      rank: 3
    },
    { 
      model: 'XGBoost', 
      status: 'running', 
      mae: null, 
      mape: null, 
      rmse: null, 
      r2: null,
      trainingTime: '5m 12s',
      rank: null
    }
  ])

  // Mock forecast data
  const forecastData = [
    { date: '2023-01-01', actual: 100, prophet: 98, arima: 102, ets: 99 },
    { date: '2023-01-02', actual: 105, prophet: 103, arima: 107, ets: 104 },
    { date: '2023-01-03', actual: 98, prophet: 101, arima: 99, ets: 97 },
    { date: '2023-01-04', actual: 112, prophet: 110, arima: 114, ets: 109 },
    { date: '2023-01-05', actual: 108, prophet: 106, arima: 110, ets: 107 },
    { date: '2023-01-06', actual: null, prophet: 109, arima: 113, ets: 110 },
    { date: '2023-01-07', actual: null, prophet: 112, arima: 116, ets: 113 },
    { date: '2023-01-08', actual: null, prophet: 115, arima: 119, ets: 116 }
  ]

  const handleStartTraining = () => {
    setTrainingStatus('running')
    setProgress(0)
    setElapsedTime(0)
    setCurrentModel('Auto ARIMA')
    
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTrainingStatus('completed')
          setCurrentModel('')
          return 100
        }
        return prev + 2
      })
      setElapsedTime(prev => prev + 1)
    }, 200)
  }

  const handleStopTraining = () => {
    setTrainingStatus('idle')
    setProgress(0)
    setCurrentModel('')
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Завершено</Badge>
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800">Выполняется</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Ошибка</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Ожидание</Badge>
    }
  }

  const getRankBadge = (rank) => {
    if (!rank) return null
    const colors = {
      1: 'bg-yellow-100 text-yellow-800',
      2: 'bg-gray-100 text-gray-800',
      3: 'bg-orange-100 text-orange-800'
    }
    return <Badge className={colors[rank] || 'bg-blue-100 text-blue-800'}>#{rank}</Badge>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Обучение и прогнозирование</h1>
        <p className="text-muted-foreground">
          Запустите процесс обучения моделей и просмотрите результаты прогнозирования
        </p>
      </div>

      <div className="space-y-6">
        {/* Training Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="text-primary" size={20} />
              <span>Управление обучением</span>
            </CardTitle>
            <CardDescription>
              Запустите или остановите процесс обучения моделей
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleStartTraining}
                disabled={trainingStatus === 'running'}
                className="bg-primary hover:bg-primary/90"
              >
                <Play size={16} className="mr-2" />
                Начать обучение
              </Button>
              <Button 
                variant="outline"
                onClick={handleStopTraining}
                disabled={trainingStatus !== 'running'}
              >
                <Square size={16} className="mr-2" />
                Остановить
              </Button>
            </div>

            {trainingStatus === 'running' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Общий прогресс</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Время: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
                  </div>
                  {currentModel && (
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={16} />
                      <span>Текущая модель: {currentModel}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {trainingStatus === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <div>
                    <p className="font-medium text-green-800">Обучение завершено успешно</p>
                    <p className="text-sm text-green-600">
                      Все модели обучены. Результаты доступны в таблице ниже.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Model Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="text-primary" size={20} />
              <span>Лидерборд моделей</span>
            </CardTitle>
            <CardDescription>
              Сравнение качества обученных моделей по различным метрикам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Ранг</th>
                    <th className="text-left p-3 font-medium">Модель</th>
                    <th className="text-left p-3 font-medium">Статус</th>
                    <th className="text-left p-3 font-medium">MAE</th>
                    <th className="text-left p-3 font-medium">MAPE</th>
                    <th className="text-left p-3 font-medium">RMSE</th>
                    <th className="text-left p-3 font-medium">R²</th>
                    <th className="text-left p-3 font-medium">Время</th>
                  </tr>
                </thead>
                <tbody>
                  {modelResults
                    .sort((a, b) => (a.rank || 999) - (b.rank || 999))
                    .map((model, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        {getRankBadge(model.rank)}
                      </td>
                      <td className="p-3 font-medium">{model.model}</td>
                      <td className="p-3">{getStatusBadge(model.status)}</td>
                      <td className="p-3">{model.mae ? model.mae.toFixed(2) : '-'}</td>
                      <td className="p-3">{model.mape ? `${model.mape.toFixed(1)}%` : '-'}</td>
                      <td className="p-3">{model.rmse ? model.rmse.toFixed(2) : '-'}</td>
                      <td className="p-3">{model.r2 ? model.r2.toFixed(3) : '-'}</td>
                      <td className="p-3 text-sm text-muted-foreground">{model.trainingTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="text-primary" size={20} />
              <span>Визуализация прогнозов</span>
            </CardTitle>
            <CardDescription>
              Сравнение прогнозов различных моделей с фактическими данными
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line" className="space-y-4">
              <TabsList>
                <TabsTrigger value="line">Линейный график</TabsTrigger>
                <TabsTrigger value="bar">Столбчатая диаграмма</TabsTrigger>
              </TabsList>
              
              <TabsContent value="line">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#0077C8" 
                        strokeWidth={3}
                        name="Фактические данные"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="prophet" 
                        stroke="#28a745" 
                        strokeDasharray="5 5"
                        name="Prophet"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="arima" 
                        stroke="#ffc107" 
                        strokeDasharray="5 5"
                        name="Auto ARIMA"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ets" 
                        stroke="#dc3545" 
                        strokeDasharray="5 5"
                        name="ETS"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="bar">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="actual" fill="#0077C8" name="Фактические данные" />
                      <Bar dataKey="prophet" fill="#28a745" name="Prophet" />
                      <Bar dataKey="arima" fill="#ffc107" name="Auto ARIMA" />
                      <Bar dataKey="ets" fill="#dc3545" name="ETS" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Model Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Лучшая модель</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Prophet</div>
              <p className="text-sm text-muted-foreground">По метрике MAPE: 7.1%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Средняя точность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">91.2%</div>
              <p className="text-sm text-muted-foreground">Среди всех моделей</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Время обучения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">7m 30s</div>
              <p className="text-sm text-muted-foreground">Общее время</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline">
            Назад к конфигурации
          </Button>
          <div className="space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Скачать результаты</span>
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Перейти к анализу
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

