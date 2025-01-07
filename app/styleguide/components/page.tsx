'use client';

import { useState } from 'react';

export default function ComponentsPage() {
  const [selected, setSelected] = useState('option1');
  const [checked, setChecked] = useState(false);
  const [multiSelect, setMultiSelect] = useState(['option1']);

  return (
    <div className="space-y-16">
      {/* Form Controls */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Form Controls</h2>
          <p className="body-regular text-primary-600">Input elements and form controls</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Inputs */}
          <div className="space-y-4">
            <h3 className="text-h4 text-primary-900">Text Inputs</h3>
            
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Default Input</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
                placeholder="Enter text..."
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Disabled Input</label>
              <input
                type="text"
                disabled
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                placeholder="Disabled input"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Error Input</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-error-300 focus:border-error-500 focus:ring-1 focus:ring-error-500"
                placeholder="Error state..."
              />
              <p className="mt-1.5 text-sm text-error-600">This field is required</p>
            </div>
          </div>

          {/* Radio & Checkbox */}
          <div className="space-y-4">
            <h3 className="text-h4 text-primary-900">Radio & Checkbox</h3>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio-group"
                  value="option1"
                  checked={selected === 'option1'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">Option 1</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio-group"
                  value="option2"
                  checked={selected === 'option2'}
                  onChange={(e) => setSelected(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">Option 2</label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Checkbox option</label>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Buttons</h2>
          <p className="body-regular text-primary-600">Button variations and states</p>
        </div>

        <div className="space-y-4">
          <div className="space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-900 rounded-lg hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 transition-colors">
              Secondary Button
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-error-600 rounded-lg hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 transition-colors">
              Danger Button
            </button>
          </div>

          <div className="space-x-4">
            <button disabled className="px-4 py-2 text-sm font-medium text-white bg-primary-900/40 rounded-lg cursor-not-allowed">
              Disabled Primary
            </button>
            <button disabled className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed">
              Disabled Secondary
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Cards</h2>
          <p className="body-regular text-primary-600">Various card layouts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:border-gray-300 transition-colors">
            <h3 className="text-h4 text-primary-900 mb-2">Basic Card</h3>
            <p className="text-gray-600 mb-4">
              A simple card with text content and optional action.
            </p>
            <button className="text-gray-700 hover:text-gray-900 font-medium">
              Learn More →
            </button>
          </div>

          {/* Image Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:border-gray-300 transition-colors">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400">Image Placeholder</p>
            </div>
            <div className="p-6">
              <h3 className="text-h4 text-primary-900 mb-2">Image Card</h3>
              <p className="text-gray-600 mb-4">
                A card with an image, text content, and action.
              </p>
              <button className="text-gray-700 hover:text-gray-900 font-medium">
                View Details →
              </button>
            </div>
          </div>

          {/* Gradient Card */}
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-xl p-6 text-white">
            <h3 className="text-h4 mb-2">Featured Card</h3>
            <p className="text-gray-200 mb-4">
              A card with gradient background for featured content.
            </p>
            <button className="px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Explore
            </button>
          </div>

          {/* Status Card */}
          <div className="bg-success-50 border border-success-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 rounded-full bg-success-500 mr-2"></div>
              <h3 className="text-h4 text-success-700">Success Card</h3>
            </div>
            <p className="text-success-600 mb-4">
              A card indicating a successful state or action.
            </p>
            <button className="text-success-700 hover:text-success-800 font-medium">
              View Status →
            </button>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Alerts</h2>
          <p className="body-regular text-primary-600">Status and notification messages</p>
        </div>

        <div className="space-y-4">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <p className="text-success-800">Success message goes here</p>
          </div>

          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <p className="text-error-800">Error message goes here</p>
          </div>

          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <p className="text-warning-800">Warning message goes here</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-800">Information message goes here</p>
          </div>
        </div>
      </section>
    </div>
  );
} 