import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [connected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('clients').select('count')
        if (!error) {
          setConnected(true)
        } else {
          console.log('Supabase connection error:', error.message)
          setConnected(false)
        }
      } catch (err) {
        console.log('Supabase test failed:', err)
        setConnected(false)
      }
    }
    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bill's Portal - React
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Production React application
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            connected === null ? 'bg-yellow-500' : 
            connected ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className="text-sm text-gray-500">
            Supabase: {connected === null ? 'Testing...' : connected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        <div className="mt-6 text-xs text-gray-400">
          Stack: Vite + React + TypeScript + shadcn/ui + Tailwind + Supabase
        </div>
      </div>
    </div>
  )
}

export default App
