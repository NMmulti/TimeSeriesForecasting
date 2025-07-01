import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Upload, 
  Database, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Eye,
  Download
} from 'lucide-react'

export default function DataUpload() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [dbConnection, setDbConnection] = useState({
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
    table: ''
  })
  const [connectionStatus, setConnectionStatus] = useState('idle') // idle, connecting, connected, error
  const [previewData, setPreviewData] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile(file)
      // Simulate file processing
      setTimeout(() => {
        setPreviewData({
          columns: ['date', 'value', 'category', 'id'],
          rows: [
            ['2023-01-01', '100.5', 'A', '1'],
            ['2023-01-02', '102.3', 'A', '1'],
            ['2023-01-03', '98.7', 'B', '2'],
            ['2023-01-04', '105.1', 'A', '1'],
            ['2023-01-05', '99.8', 'B', '2']
          ]
        })
      }, 1000)
    }
  }

  const handleDbConnect = () => {
    setConnectionStatus('connecting')
    // Simulate database connection
    setTimeout(() => {
      if (dbConnection.host && dbConnection.database && dbConnection.username) {
        setConnectionStatus('connected')
        setPreviewData({
          columns: ['timestamp', 'metric_value', 'sensor_id', 'location'],
          rows: [
            ['2023-12-01 10:00:00', '45.2', 'TEMP_001', 'Норильск'],
            ['2023-12-01 11:00:00', '46.1', 'TEMP_001', 'Норильск'],
            ['2023-12-01 12:00:00', '44.8', 'TEMP_002', 'Дудинка'],
            ['2023-12-01 13:00:00', '47.3', 'TEMP_001', 'Норильск'],
            ['2023-12-01 14:00:00', '45.9', 'TEMP_002', 'Дудинка']
          ]
        })
      } else {
        setConnectionStatus('error')
      }
    }, 2000)
  }

  const handleDbInputChange = (field, value) => {
    setDbConnection(prev => ({ ...prev, [field]: value }))
    setConnectionStatus('idle')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Загрузка данных</h1>
        <p className="text-muted-foreground">
          Загрузите данные временных рядов из файла или подключитесь к базе данных PostgreSQL
        </p>
      </div>

      <Tabs defaultValue="file" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file" className="flex items-center space-x-2">
            <FileText size={16} />
            <span>Загрузка из файла</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center space-x-2">
            <Database size={16} />
            <span>Подключение к БД</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="text-primary" size={20} />
                <span>Загрузка файла</span>
              </CardTitle>
              <CardDescription>
                Поддерживаются форматы: CSV, Excel (.xlsx, .xls)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Перетащите файл сюда или выберите файл</p>
                  <p className="text-sm text-muted-foreground">
                    Максимальный размер файла: 100 МБ
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="mt-4 max-w-xs mx-auto"
                />
              </div>

              {uploadedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Файл успешно загружен</p>
                      <p className="text-sm text-green-600">
                        {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} МБ)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="text-primary" size={20} />
                <span>Подключение к PostgreSQL</span>
              </CardTitle>
              <CardDescription>
                Введите параметры подключения к базе данных
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">Хост</Label>
                  <Input
                    id="host"
                    placeholder="localhost"
                    value={dbConnection.host}
                    onChange={(e) => handleDbInputChange('host', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Порт</Label>
                  <Input
                    id="port"
                    placeholder="5432"
                    value={dbConnection.port}
                    onChange={(e) => handleDbInputChange('port', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="database">База данных</Label>
                  <Input
                    id="database"
                    placeholder="timeseries_db"
                    value={dbConnection.database}
                    onChange={(e) => handleDbInputChange('database', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="table">Таблица</Label>
                  <Input
                    id="table"
                    placeholder="sensor_data"
                    value={dbConnection.table}
                    onChange={(e) => handleDbInputChange('table', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Пользователь</Label>
                  <Input
                    id="username"
                    placeholder="postgres"
                    value={dbConnection.username}
                    onChange={(e) => handleDbInputChange('username', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={dbConnection.password}
                    onChange={(e) => handleDbInputChange('password', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleDbConnect}
                disabled={connectionStatus === 'connecting'}
                className="w-full"
              >
                {connectionStatus === 'connecting' ? 'Подключение...' : 'Подключиться'}
              </Button>

              {connectionStatus === 'connected' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Подключение установлено</p>
                      <p className="text-sm text-green-600">
                        Успешно подключено к {dbConnection.database}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {connectionStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="text-red-600" size={20} />
                    <div>
                      <p className="font-medium text-red-800">Ошибка подключения</p>
                      <p className="text-sm text-red-600">
                        Проверьте параметры подключения и повторите попытку
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Data Preview */}
      {previewData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="text-primary" size={20} />
              <span>Предпросмотр данных</span>
            </CardTitle>
            <CardDescription>
              Первые 5 строк загруженных данных
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    {previewData.columns.map((column, index) => (
                      <th key={index} className="border border-border p-2 text-left font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-muted/50">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-border p-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Показано 5 из {previewData.rows.length + 1000} строк
              </p>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download size={16} />
                <span>Скачать образец</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {previewData && (
        <div className="flex justify-end space-x-4">
          <Button variant="outline">
            Назад
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Продолжить к настройке модели
          </Button>
        </div>
      )}
    </div>
  )
}

