export default function ColorGuidePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8">
      {/* Primary Colors Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Primary Colors</h2>
          <p className="body-regular text-primary-600">Main colors used throughout the application</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-50"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 50</p>
                <p className="help-text">#f7f7f7</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-100"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 100</p>
                <p className="help-text">#e3e3e3</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-200"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 200</p>
                <p className="help-text">#c8c8c8</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-300"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 300</p>
                <p className="help-text">#a4a4a4</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-400"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 400</p>
                <p className="help-text">#808080</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-500"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 500</p>
                <p className="help-text">#666666</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-600 text-white"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 600</p>
                <p className="help-text">#4d4d4d</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-700 text-white"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 700</p>
                <p className="help-text">#333333</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-800 text-white"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 800</p>
                <p className="help-text">#1f1f1f</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-primary-900 text-white"></div>
              <div className="p-3 bg-gray-50">
                <p className="body-bold">Primary 900</p>
                <p className="help-text">#191919</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Colors Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Gradient Colors</h2>
          <p className="body-regular text-primary-600">Brand gradients for different user types</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden">
            <div className="h-32 bg-artist-gradient text-white p-6">
              <h4 className="text-h4 mb-2 text-white">Artist Section</h4>
              <p className="body-regular text-white/90">Content with artist gradient background</p>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="body-bold">Artist Gradient</p>
              <p className="help-text text-primary-500">Start: #EC008C → End: #FF7171</p>
              <p className="help-text text-primary-500">Used for artist-specific elements</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden">
            <div className="h-32 bg-business-gradient text-white p-6">
              <h4 className="text-h4 mb-2 text-white">Business Section</h4>
              <p className="body-regular text-white/90">Content with business gradient background</p>
            </div>
            <div className="p-4 bg-gray-50">
              <p className="body-bold">Business Gradient</p>
              <p className="help-text text-primary-500">Start: #FFBC5D → End: #F25722</p>
              <p className="help-text text-primary-500">Used for business-specific elements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grayscale Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Grayscale</h2>
          <p className="body-regular text-primary-600">Systematic grays for UI elements</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-50"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 50</p>
                <p className="help-text">#F9FAFB - Background, hover states</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-100"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 100</p>
                <p className="help-text">#F3F4F6 - Cards, subtle backgrounds</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-200"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 200</p>
                <p className="help-text">#E5E7EB - Borders, dividers</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-300"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 300</p>
                <p className="help-text">#D1D5DB - Disabled states</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-400"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 400</p>
                <p className="help-text">#9CA3AF - Placeholder text</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-500"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 500</p>
                <p className="help-text">#6B7280 - Secondary text</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-600"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 600</p>
                <p className="help-text">#4B5563 - Body text</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-700"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 700</p>
                <p className="help-text">#374151 - Strong text</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-800"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 800</p>
                <p className="help-text">#1F2937 - Headings</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-900"></div>
              <div className="p-3 bg-gray-100">
                <p className="body-bold">Gray 900</p>
                <p className="help-text">#111827 - Extra strong text</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Usage Examples</h2>
          <p className="body-regular text-primary-600">Common UI elements with applied colors</p>
        </div>
        <div className="space-y-8">
          {/* Card Example */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-h3 text-primary-900 mb-2">Card Example</h3>
            <p className="body-regular text-primary-600 mb-4">
              This card uses various grays for borders, shadows, and text.
            </p>
            <div className="space-x-4">
              <button className="bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors">
                Primary Button
              </button>
              <button className="bg-gray-100 text-primary-900 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Secondary Button
              </button>
            </div>
          </div>

          {/* Gradient Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden">
              <div className="h-32 bg-artist-gradient text-white p-6">
                <h4 className="text-h4 mb-2 text-white">Artist Section</h4>
                <p className="body-regular text-white/90">Content with artist gradient background</p>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="body-bold">Artist Gradient</p>
                <p className="help-text text-primary-500">Start: #EC008C → End: #FF7171</p>
                <p className="help-text text-primary-500">Used for artist-specific elements</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <div className="h-32 bg-business-gradient text-white p-6">
                <h4 className="text-h4 mb-2 text-white">Business Section</h4>
                <p className="body-regular text-white/90">Content with business gradient background</p>
              </div>
              <div className="p-4 bg-gray-50">
                <p className="body-bold">Business Gradient</p>
                <p className="help-text text-primary-500">Start: #FFBC5D → End: #F25722</p>
                <p className="help-text text-primary-500">Used for business-specific elements</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 