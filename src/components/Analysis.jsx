import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  BarChart3, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Activity,
  PieChart,
  Info,
  Download,
  RefreshCw
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts'

export default function Analysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  // Mock data for analysis
  const dataQualityStats = {
    totalRecords: 8760,
    missingValues: 127,
    duplicates: 15,
    outliers: 23,
    completeness: 98.5,
    consistency: 97.8
  }

  const missingValuesByMonth = [
    { month: 'Янв', missing: 12, total: 744 },
    { month: 'Фев', missing: 8, total: 672 },
    { month: 'Мар', missing: 15, total: 744 },
    { month: 'Апр', missing: 10, total: 720 },
    { month: 'Май', missing: 18, total: 744 },
    { month: 'Июн', missing: 22, total: 720 },
    { month: 'Июл', missing: 14, total: 744 },
    { month: 'Авг', missing: 9, total: 744 },
    { month: 'Сен', missing: 7, total: 720 },
    { month: 'Окт', missing: 6, total: 744 },
    { month: 'Ноя', missing: 3, total: 720 },
    { month: 'Дек', missing: 3, total: 744 }
  ]

  const seasonalityData = [
    { period: 'Зима', value: 85.2, variance: 12.4 },
    { period: 'Весна', value: 92.8, variance: 8.7 },
    { period: 'Лето', value: 108.5, variance: 15.2 },
    { period: 'Осень', value: 96.3, variance: 10.1 }
  ]

  const anomalyData = [
    { date: '2023-03-15', value: 145.2, expected: 98.5, severity: 'high' },
    { date: '2023-06-22', value: 156.8, expected: 105.2, severity: 'high' },
    { date: '2023-08-10', value: 78.1, expected: 112.3, severity: 'medium' },
    { date: '2023-11-05', value: 68.9, expected: 95.7, severity: 'medium' },
    { date: '2023-12-18', value: 142.6, expected: 88.2, severity: 'high' }
  ]

  const correlationData = [
    { variable: 'Температура', correlation: 0.87, pValue: 0.001 },
    { variable: 'Давление', correlation: -0.62, pValue: 0.023 },
    { variable: 'Влажность', correlation: 0.45, pValue: 0.156 },
    { variable: 'Скорость ветра', correlation: -0.33, pValue: 0.287 }
  ]

  const trendData = [
    { month: 'Янв', trend: 95.2, seasonal: 92.1, residual: 3.1 },
    { month: 'Фев', trend: 96.8, seasonal: 94.3, residual: 2.5 },
    { month: 'Мар', trend: 98.1, seasonal: 96.8, residual: 1.3 },
    { month: 'Апр', trend: 99.5, seasonal: 98.2, residual: 1.3 },
    { month: 'Май', trend: 101.2, seasonal: 99.8, residual: 1.4 },
    { month: 'Июн', trend: 102.8, seasonal: 101.5, residual: 1.3 },
    { month: 'Июл', trend: 104.1, seasonal: 102.9, residual: 1.2 },
    { month: 'Авг', trend: 105.3, seasonal: 104.1, residual: 1.2 },
    { month: 'Сен', trend: 106.2, seasonal: 105.0, residual: 1.2 },
    { month: 'Окт', trend: 107.1, seasonal: 105.8, residual: 1.3 },
    { month: 'Ноя', trend: 107.8, seasonal: 106.5, residual: 1.3 },
    { month: 'Дек', trend: 108.4, seasonal: 107.1, residual: 1.3 }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#dc3545'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    const labels = {
      high: 'Высокая',
      medium: 'Средняя',
      low: 'Низкая'
    }
    return <Badge className={colors[severity]}>{labels[severity]}</Badge>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Анализ данных</h1>
        <p className="text-muted-foreground">
          Статистический анализ временных рядов, выявление аномалий и изучение сезонности
        </p>
      </div>

      <div className="space-y-6">
        {/* Data Quality Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <BarChart3 className="text-primary" size={20} />
                <span>Всего записей</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dataQualityStats.totalRecords.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Временных точек</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertTriangle className="text-orange-500" size={20} />
                <span>Пропуски</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dataQualityStats.missingValues}</div>
              <p className="text-sm text-muted-foreground">
                {((dataQualityStats.missingValues / dataQualityStats.totalRecords) * 100).toFixed(1)}% от общего объема
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="text-red-500" size={20} />
                <span>Аномалии</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dataQualityStats.outliers}</div>
              <p className="text-sm text-muted-foreground">Выбросы обнаружены</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={20} />
                <span>Качество</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dataQualityStats.completeness}%</div>
              <p className="text-sm text-muted-foreground">Полнота данных</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="missing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="missing">Пропуски</TabsTrigger>
            <TabsTrigger value="anomalies">Аномалии</TabsTrigger>
            <TabsTrigger value="seasonality">Сезонность</TabsTrigger>
            <TabsTrigger value="correlation">Корреляции</TabsTrigger>
          </TabsList>

          <TabsContent value="missing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="text-primary" size={20} />
                  <span>Анализ пропущенных значений</span>
                </CardTitle>
                <CardDescription>
                  Распределение пропущенных значений по месяцам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={missingValuesByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="missing" fill="#ffc107" name="Пропущенные значения" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="text-primary" size={20} />
                  <span>Обнаруженные аномалии</span>
                </CardTitle>
                <CardDescription>
                  Список выявленных аномальных значений с оценкой серьезности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Дата</th>
                        <th className="text-left p-3 font-medium">Фактическое значение</th>
                        <th className="text-left p-3 font-medium">Ожидаемое значение</th>
                        <th className="text-left p-3 font-medium">Отклонение</th>
                        <th className="text-left p-3 font-medium">Серьезность</th>
                      </tr>
                    </thead>
                    <tbody>
                      {anomalyData.map((anomaly, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3">{anomaly.date}</td>
                          <td className="p-3 font-medium">{anomaly.value}</td>
                          <td className="p-3">{anomaly.expected}</td>
                          <td className="p-3">
                            {((anomaly.value - anomaly.expected) / anomaly.expected * 100).toFixed(1)}%
                          </td>
                          <td className="p-3">{getSeverityBadge(anomaly.severity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seasonality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="text-primary" size={20} />
                  <span>Сезонный анализ</span>
                </CardTitle>
                <CardDescription>
                  Анализ сезонных паттернов и декомпозиция временного ряда
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Сезонные средние</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={seasonalityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#0077C8" name="Среднее значение" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Декомпозиция тренда</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="trend" stroke="#0077C8" name="Тренд" />
                          <Line type="monotone" dataKey="seasonal" stroke="#28a745" name="Сезонность" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="correlation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="text-primary" size={20} />
                  <span>Корреляционный анализ</span>
                </CardTitle>
                <CardDescription>
                  Анализ взаимосвязей между переменными
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Переменная</th>
                        <th className="text-left p-3 font-medium">Коэффициент корреляции</th>
                        <th className="text-left p-3 font-medium">P-значение</th>
                        <th className="text-left p-3 font-medium">Значимость</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{item.variable}</td>
                          <td className="p-3">
                            <span className={`font-medium ${Math.abs(item.correlation) > 0.5 ? 'text-green-600' : 'text-gray-600'}`}>
                              {item.correlation.toFixed(3)}
                            </span>
                          </td>
                          <td className="p-3">{item.pValue.toFixed(3)}</td>
                          <td className="p-3">
                            {item.pValue < 0.05 ? (
                              <Badge className="bg-green-100 text-green-800">Значимая</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">Незначимая</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary and Actions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Info className="text-blue-600" size={20} />
              <span>Сводка анализа</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <div className="space-y-2">
              <p>• Качество данных: <strong>высокое</strong> (полнота {dataQualityStats.completeness}%)</p>
              <p>• Обнаружено <strong>{dataQualityStats.outliers} аномалий</strong>, требующих внимания</p>
              <p>• Выявлена <strong>сильная сезонность</strong> с пиком в летний период</p>
              <p>• Наиболее значимая корреляция с температурой (r = 0.87)</p>
              <p>• Рекомендуется использовать модели, учитывающие сезонность</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline">
            Назад к обучению
          </Button>
          <div className="space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Обновить анализ</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Скачать отчет</span>
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Перейти к экспорту
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

