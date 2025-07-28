export default function AIAssistant() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">AI Resume Assistant</h2>
        <p className="text-gray-600 text-sm mb-4">
          Describe your job role or paste a job description — the assistant will suggest resume content.
        </p>
        {/* Later: integrate OpenAI prompt UI */}
        <textarea
          placeholder="Paste job description..."
          className="w-full h-40 border rounded p-2"
        />
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Generate Content
        </button>
      </div>
    );
  }