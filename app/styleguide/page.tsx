export default function TypographyPage() {
  return (
    <div className="space-y-16">
      {/* Display Text Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Display Text (Poppins)</h2>
          <p className="body-regular text-primary-600">Showing exact pixel sizes and weights</p>
        </div>
        <div className="space-y-8">
          <div>
            <h1>Heading 1 - 48px</h1>
            <p className="help-text text-primary-500">48px / Line Height 1.4 / Weight 600</p>
          </div>
          <div>
            <h2>Heading 2 - 36px</h2>
            <p className="help-text text-primary-500">36px / Line Height 1.4 / Weight 600</p>
          </div>
          <div>
            <h3>Heading 3 - 24px</h3>
            <p className="help-text text-primary-500">24px / Line Height 1.4 / Weight 600</p>
          </div>
          <div>
            <h4>Heading 4 - 22px</h4>
            <p className="help-text text-primary-500">22px / Line Height 1.4 / Weight 600</p>
          </div>
          <div>
            <h5>Heading 5 - 18px</h5>
            <p className="help-text text-primary-500">18px / Line Height 1.4 / Weight 600</p>
          </div>
        </div>
      </section>

      {/* Body Text Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Body Text (Inter)</h2>
          <p className="body-regular text-primary-600">Various sizes for different contexts</p>
        </div>
        <div className="space-y-6">
          <div>
            <p className="body-large-medium">Body Large Medium - 16px</p>
            <p className="help-text text-primary-500">16px / Line Height 1.4 / Weight 500</p>
          </div>
          <div>
            <p className="body-large-regular">Body Large Regular - 16px</p>
            <p className="help-text text-primary-500">16px / Line Height 1.4 / Weight 400</p>
          </div>
          <div>
            <p className="body-bold">Body Bold - 14px</p>
            <p className="help-text text-primary-500">14px / Line Height 1.4 / Weight 700</p>
          </div>
          <div>
            <p className="body-regular">Body Regular - 14px</p>
            <p className="help-text text-primary-500">14px / Line Height 1.4 / Weight 400</p>
          </div>
          <div>
            <p className="body-light">Body Light - 14px</p>
            <p className="help-text text-primary-500">14px / Line Height 1.4 / Weight 300</p>
          </div>
        </div>
      </section>

      {/* Help Text Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 text-primary-900">Help Text (Inter)</h2>
          <p className="body-regular text-primary-600">Smallest text size for auxiliary information</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="help-text-bold">Help Text Bold - 12px</p>
            <p className="help-text text-primary-500">12px / Line Height 1.4 / Weight 700</p>
          </div>
          <div>
            <p className="help-text">Help Text Regular - 12px</p>
            <p className="help-text text-primary-500">12px / Line Height 1.4 / Weight 400</p>
          </div>
        </div>
      </section>
    </div>
  );
} 