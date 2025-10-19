import { getGiftWishesByClass } from '../actions/giftWish'

export default async function AdminPage() {
  const result = await getGiftWishesByClass()
  
  if (!result.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {result.error}
          </div>
        </div>
      </div>
    )
  }

  const groupedWishes = result.data
  const classes = Object.keys(groupedWishes).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            🎅 Lista życzeń uczniów
          </h1>
          <p className="text-gray-600">
            Wszystkie życzenia dla Świętego Mikołaja
          </p>
        </div>

        {classes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">
              Jeszcze nie ma żadnych życzeń 🎄
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {classes.map((className) => (
              <div key={className} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Klasa {className}
                  </h2>
                  <p className="text-red-100">
                    {groupedWishes[className].length} {groupedWishes[className].length === 1 ? 'uczeń' : 'uczniów'}
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Imię
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wiek
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prezent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Link
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedWishes[className].map((wish) => (
                        <tr key={wish.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {wish.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {wish.age} lat
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-md">
                              {wish.giftWish}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {wish.giftLink ? (
                              <a
                                href={wish.giftLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                🔗 Link
                              </a>
                            ) : (
                              <span className="text-gray-400 text-sm">Brak</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(wish.createdAt).toLocaleDateString('pl-PL')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            ← Powrót do formularza
          </a>
        </div>
      </div>
    </div>
  )
}