import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Download, 
  Database, 
  FileText, 
  Table,
  BarChart3,
  CheckCircle,
  Clock,
  Settings,
  Mail,
  Calendar
} from 'lucide-react'

export default function Export() {
  const [exportConfig, setExportConfig] = useState({
    format: 'excel',
    includeData: true,
    includeModels: true,
    includeForecasts: true,
    includeAnalysis: true,
    dateRange: 'all',
    compression: false,
    emailNotification: false,
    email: '',
    scheduledExport: false,
    frequency: 'weekly'
  })

  const [dbConfig, setDbConfig] = useState({
    host: 'localhost',
    port: '5432',
    database: 'forecasting_results',
    table: 'model_outputs',
    username: 'postgres',
    password: '',
    overwrite: false
  })

  const [exportStatus, setExportStatus] = useState('idle') // idle, preparing, ready, error

  const exportFormats = [
    { value: 'excel', label: 'Excel (.xlsx)', icon: Table, description: 'Многолистовой Excel файл с данными и графиками' },
    { value: 'csv', label: 'CSV (.csv)', icon: FileText, description: 'Простой CSV файл для импорта в другие системы' },
    { value: 'json', label: 'JSON (.json)', icon: FileText, description: 'Структурированные данные в формате JSON' },
    { value: 'pdf', label: 'PDF отчет (.pdf)', icon: FileText, description: 'Готовый отчет с графиками и анализом' }
  ]

  const exportSections = [
    { id: 'includeData', label: 'Исходные данные', description: 'Временные ряды и метаданные' },
    { id: 'includeModels', label: 'Результаты моделей', description: 'Метрики качества и параметры моделей' },
    { id: 'includeForecasts', label: 'Прогнозы', description: 'Прогнозные значения всех моделей' },
    { id: 'includeAnalysis', label: 'Анализ данных', description: 'Статистика, аномалии, сезонность' }
  ]

  const handleConfigChange = (field, value) => {
    setExportConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleDbConfigChange = (field, value) => {
    setDbConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleExport = async (type) => {
    setExportStatus('preparing')
    
    // Simulate export preparation
    setTimeout(() => {
      setExportStatus('ready')
      
      // Simulate download
      const filename = `forecast_results_${new Date().toISOString().split('T')[0]}.${exportConfig.format}`
      console.log(`Downloading ${filename}`)
      
      setTimeout(() => {
        setExportStatus('idle')
      }, 2000)
    }, 3000)
  }

  const handleDatabaseSave = async () => {
    setExportStatus('preparing')
    
    // Simulate database save
    setTimeout(() => {
      setExportStatus('ready')
      setTimeout(() => {
        setExportStatus('idle')
      }, 2000)
    }, 2000)
  }

  const getStatusMessage = () => {
    switch (exportStatus) {
      case 'preparing':
        return 'Подготовка экспорта...'
      case 'ready':
        return 'Экспорт завершен успешно!'
      case 'error':
        return 'Ошибка при экспорте'
      default:
        return ''
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Экспорт результатов</h1>
        <p className="text-muted-foreground">
          Сохраните результаты прогнозирования в различных форматах или экспортируйте в базу данных
        </p>
      </div>

      <div className="space-y-6">
        {/* Export Status */}
        {exportStatus !== 'idle' && (
          <Card className={`${exportStatus === 'ready' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                {exportStatus === 'preparing' && <Clock className="text-blue-600 animate-spin" size={20} />}
                {exportStatus === 'ready' && <CheckCircle className="text-green-600" size={20} />}
                <span className={`font-medium ${exportStatus === 'ready' ? 'text-green-800' : 'text-blue-800'}`}>
                  {getStatusMessage()}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="download" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="download">Скачивание файлов</TabsTrigger>
            <TabsTrigger value="database">Сохранение в БД</TabsTrigger>
          </TabsList>

          <TabsContent value="download" className="space-y-6">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="text-primary" size={20} />
                  <span>Выбор формата экспорта</span>
                </CardTitle>
                <CardDescription>
                  Выберите формат файла для экспорта результатов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exportFormats.map(format => {
                    const IconComponent = format.icon
                    return (
                      <div 
                        key={format.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          exportConfig.format === format.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleConfigChange('format', format.value)}
                      >
                        <div className="flex items-start space-x-3">
                          <IconComponent className="text-primary mt-1" size={20} />
                          <div className="flex-1">
                            <div className="font-medium">{format.label}</div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {format.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Content Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="text-primary" size={20} />
                  <span>Содержимое экспорта</span>
                </CardTitle>
                <CardDescription>
                  Выберите разделы для включения в экспорт
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exportSections.map(section => (
                    <div key={section.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={section.id}
                        checked={exportConfig[section.id]}
                        onCheckedChange={(checked) => handleConfigChange(section.id, checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={section.id} className="font-medium cursor-pointer">
                          {section.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Диапазон дат</Label>
                    <Select value={exportConfig.dateRange} onValueChange={(value) => handleConfigChange('dateRange', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все данные</SelectItem>
                        <SelectItem value="last_year">Последний год</SelectItem>
                        <SelectItem value="last_month">Последний месяц</SelectItem>
                        <SelectItem value="custom">Пользовательский диапазон</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="compression"
                        checked={exportConfig.compression}
                        onCheckedChange={(checked) => handleConfigChange('compression', checked)}
                      />
                      <Label htmlFor="compression">Сжать файл (ZIP)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailNotification"
                        checked={exportConfig.emailNotification}
                        onCheckedChange={(checked) => handleConfigChange('emailNotification', checked)}
                      />
                      <Label htmlFor="emailNotification">Уведомление на email</Label>
                    </div>
                  </div>
                </div>

                {exportConfig.emailNotification && (
                  <div className="space-y-2">
                    <Label>Email для уведомлений</Label>
                    <Input
                      type="email"
                      value={exportConfig.email}
                      onChange={(e) => handleConfigChange('email', e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scheduled Export */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="text-primary" size={20} />
                  <span>Автоматический экспорт</span>
                </CardTitle>
                <CardDescription>
                  Настройте регулярный экспорт результатов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scheduledExport"
                    checked={exportConfig.scheduledExport}
                    onCheckedChange={(checked) => handleConfigChange('scheduledExport', checked)}
                  />
                  <Label htmlFor="scheduledExport">Включить автоматический экспорт</Label>
                </div>

                {exportConfig.scheduledExport && (
                  <div className="space-y-2">
                    <Label>Частота экспорта</Label>
                    <Select value={exportConfig.frequency} onValueChange={(value) => handleConfigChange('frequency', value)}>
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Ежедневно</SelectItem>
                        <SelectItem value="weekly">Еженедельно</SelectItem>
                        <SelectItem value="monthly">Ежемесячно</SelectItem>
                        <SelectItem value="quarterly">Ежеквартально</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Export Actions */}
            <div className="flex justify-between">
              <Button variant="outline">
                Назад к анализу
              </Button>
              <Button 
                onClick={() => handleExport('download')}
                disabled={exportStatus === 'preparing'}
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Скачать результаты</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            {/* Database Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="text-primary" size={20} />
                  <span>Настройки подключения к БД</span>
                </CardTitle>
                <CardDescription>
                  Укажите параметры подключения к базе данных для сохранения результатов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Хост</Label>
                    <Input
                      value={dbConfig.host}
                      onChange={(e) => handleDbConfigChange('host', e.target.value)}
                      placeholder="localhost"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Порт</Label>
                    <Input
                      value={dbConfig.port}
                      onChange={(e) => handleDbConfigChange('port', e.target.value)}
                      placeholder="5432"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>База данных</Label>
                    <Input
                      value={dbConfig.database}
                      onChange={(e) => handleDbConfigChange('database', e.target.value)}
                      placeholder="forecasting_results"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Таблица</Label>
                    <Input
                      value={dbConfig.table}
                      onChange={(e) => handleDbConfigChange('table', e.target.value)}
                      placeholder="model_outputs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Пользователь</Label>
                    <Input
                      value={dbConfig.username}
                      onChange={(e) => handleDbConfigChange('username', e.target.value)}
                      placeholder="postgres"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Пароль</Label>
                    <Input
                      type="password"
                      value={dbConfig.password}
                      onChange={(e) => handleDbConfigChange('password', e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox
                    id="overwrite"
                    checked={dbConfig.overwrite}
                    onCheckedChange={(checked) => handleDbConfigChange('overwrite', checked)}
                  />
                  <Label htmlFor="overwrite">Перезаписать существующие данные</Label>
                </div>
              </CardContent>
            </Card>

            {/* Database Actions */}
            <div className="flex justify-between">
              <Button variant="outline">
                Тестировать подключение
              </Button>
              <Button 
                onClick={handleDatabaseSave}
                disabled={exportStatus === 'preparing'}
                className="bg-primary hover:bg-primary/90 flex items-center space-x-2"
              >
                <Database size={16} />
                <span>Сохранить в БД</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Summary */}
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="text-primary" size={20} />
              <span>Сводка экспорта</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Формат:</p>
                <p className="text-gray-600">{exportFormats.find(f => f.value === exportConfig.format)?.label}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Разделы:</p>
                <p className="text-gray-600">
                  {exportSections.filter(s => exportConfig[s.id]).length} из {exportSections.length}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Диапазон:</p>
                <p className="text-gray-600">
                  {exportConfig.dateRange === 'all' ? 'Все данные' : 'Ограниченный'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

