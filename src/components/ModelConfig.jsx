import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Settings, 
  Calendar, 
  Target, 
  Hash,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

export default function ModelConfig() {
  const [config, setConfig] = useState({
    dateColumn: '',
    targetColumn: '',
    idColumn: '',
    frequency: 'D',
    missingValueMethod: 'interpolate',
    selectedModels: ['auto_arima', 'ets', 'prophet'],
    metrics: ['mae', 'mape', 'rmse'],
    forecastHorizon: 30,
    seasonality: 'auto'
  })

  const availableColumns = [
    'date', 'timestamp', 'value', 'metric_value', 'temperature', 
    'pressure', 'id', 'sensor_id', 'location', 'category'
  ]

  const frequencyOptions = [
    { value: 'D', label: 'Дневная (D)' },
    { value: 'W', label: 'Недельная (W)' },
    { value: 'M', label: 'Месячная (M)' },
    { value: 'Q', label: 'Квартальная (Q)' },
    { value: 'Y', label: 'Годовая (Y)' },
    { value: 'H', label: 'Часовая (H)' },
    { value: 'T', label: 'Минутная (T)' }
  ]

  const missingValueMethods = [
    { value: 'drop', label: 'Удалить строки с пропусками' },
    { value: 'interpolate', label: 'Линейная интерполяция' },
    { value: 'forward_fill', label: 'Заполнение вперед' },
    { value: 'backward_fill', label: 'Заполнение назад' },
    { value: 'mean', label: 'Среднее значение' },
    { value: 'median', label: 'Медиана' },
    { value: 'zero', label: 'Заполнение нулями' }
  ]

  const modelOptions = [
    { id: 'auto_arima', label: 'Auto ARIMA', description: 'Автоматический подбор ARIMA модели' },
    { id: 'ets', label: 'ETS', description: 'Экспоненциальное сглаживание' },
    { id: 'prophet', label: 'Prophet', description: 'Модель Facebook Prophet' },
    { id: 'linear_regression', label: 'Линейная регрессия', description: 'Простая линейная модель' },
    { id: 'random_forest', label: 'Random Forest', description: 'Случайный лес' },
    { id: 'xgboost', label: 'XGBoost', description: 'Градиентный бустинг' },
    { id: 'lstm', label: 'LSTM', description: 'Нейронная сеть LSTM' }
  ]

  const metricOptions = [
    { id: 'mae', label: 'MAE', description: 'Средняя абсолютная ошибка' },
    { id: 'mape', label: 'MAPE', description: 'Средняя абсолютная процентная ошибка' },
    { id: 'rmse', label: 'RMSE', description: 'Корень из средней квадратичной ошибки' },
    { id: 'mse', label: 'MSE', description: 'Средняя квадратичная ошибка' },
    { id: 'r2', label: 'R²', description: 'Коэффициент детерминации' }
  ]

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleModelToggle = (modelId) => {
    setConfig(prev => ({
      ...prev,
      selectedModels: prev.selectedModels.includes(modelId)
        ? prev.selectedModels.filter(id => id !== modelId)
        : [...prev.selectedModels, modelId]
    }))
  }

  const handleMetricToggle = (metricId) => {
    setConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(id => id !== metricId)
        : [...prev.metrics, metricId]
    }))
  }

  const isConfigValid = config.dateColumn && config.targetColumn && 
                       config.selectedModels.length > 0 && config.metrics.length > 0

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Конфигурация модели</h1>
        <p className="text-muted-foreground">
          Настройте параметры для обучения модели прогнозирования временных рядов
        </p>
      </div>

      <div className="space-y-6">
        {/* Column Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="text-primary" size={20} />
              <span>Выбор колонок</span>
            </CardTitle>
            <CardDescription>
              Укажите колонки для даты, целевой переменной и идентификатора
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Calendar size={16} className="text-primary" />
                  <span>Колонка даты *</span>
                </Label>
                <Select value={config.dateColumn} onValueChange={(value) => handleConfigChange('dateColumn', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите колонку даты" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColumns.filter(col => col.includes('date') || col.includes('time')).map(column => (
                      <SelectItem key={column} value={column}>{column}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Target size={16} className="text-primary" />
                  <span>Целевая переменная *</span>
                </Label>
                <Select value={config.targetColumn} onValueChange={(value) => handleConfigChange('targetColumn', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите целевую переменную" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColumns.filter(col => !col.includes('date') && !col.includes('time') && !col.includes('id')).map(column => (
                      <SelectItem key={column} value={column}>{column}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Hash size={16} className="text-primary" />
                  <span>ID колонка</span>
                </Label>
                <Select value={config.idColumn} onValueChange={(value) => handleConfigChange('idColumn', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ID колонку (опционально)" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColumns.filter(col => col.includes('id') || col.includes('category')).map(column => (
                      <SelectItem key={column} value={column}>{column}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Processing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="text-primary" size={20} />
              <span>Обработка данных</span>
            </CardTitle>
            <CardDescription>
              Настройте частоту данных и методы обработки пропусков
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Частота данных</Label>
                <Select value={config.frequency} onValueChange={(value) => handleConfigChange('frequency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Метод обработки пропусков</Label>
                <Select value={config.missingValueMethod} onValueChange={(value) => handleConfigChange('missingValueMethod', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {missingValueMethods.map(method => (
                      <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Горизонт прогнозирования (периоды)</Label>
                <Input
                  type="number"
                  value={config.forecastHorizon}
                  onChange={(e) => handleConfigChange('forecastHorizon', parseInt(e.target.value))}
                  min="1"
                  max="365"
                />
              </div>

              <div className="space-y-2">
                <Label>Сезонность</Label>
                <Select value={config.seasonality} onValueChange={(value) => handleConfigChange('seasonality', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Автоматическое определение</SelectItem>
                    <SelectItem value="none">Без сезонности</SelectItem>
                    <SelectItem value="weekly">Недельная</SelectItem>
                    <SelectItem value="monthly">Месячная</SelectItem>
                    <SelectItem value="yearly">Годовая</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-primary" size={20} />
              <span>Выбор моделей</span>
            </CardTitle>
            <CardDescription>
              Выберите модели для обучения и сравнения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelOptions.map(model => (
                <div key={model.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={model.id}
                    checked={config.selectedModels.includes(model.id)}
                    onCheckedChange={() => handleModelToggle(model.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={model.id} className="font-medium cursor-pointer">
                      {model.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {model.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metrics Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="text-primary" size={20} />
              <span>Метрики качества</span>
            </CardTitle>
            <CardDescription>
              Выберите метрики для оценки качества моделей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metricOptions.map(metric => (
                <div key={metric.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={metric.id}
                    checked={config.metrics.includes(metric.id)}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={metric.id} className="font-medium cursor-pointer">
                      {metric.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Summary */}
        {isConfigValid && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Info className="text-green-600" size={20} />
                <span>Сводка конфигурации</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-green-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Колонка даты:</strong> {config.dateColumn}</p>
                  <p><strong>Целевая переменная:</strong> {config.targetColumn}</p>
                  <p><strong>ID колонка:</strong> {config.idColumn || 'Не выбрана'}</p>
                </div>
                <div>
                  <p><strong>Частота:</strong> {frequencyOptions.find(f => f.value === config.frequency)?.label}</p>
                  <p><strong>Горизонт прогноза:</strong> {config.forecastHorizon} периодов</p>
                  <p><strong>Выбрано моделей:</strong> {config.selectedModels.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline">
            Назад к загрузке данных
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            disabled={!isConfigValid}
          >
            Продолжить к обучению
          </Button>
        </div>
      </div>
    </div>
  )
}

