import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * App — Root application component.
 *
 * Sets up the client-side router and mounts the route tree.
 * Pages and layouts are registered here as they are implemented.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*
         * TODO: Add page routes here as they are implemented.
         *
         * Example:
         *   <Route path="/" element={<MainLayout />}>
         *     <Route index element={<HomePage />} />
         *     <Route path="analyze" element={<AnalyzePage />} />
         *   </Route>
         */}

        {/* Temporary placeholder route */}
        <Route
          path="*"
          element={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                gap: '1rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ⚖️ LexGuard AI
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
                AI-powered Contract Clause Risk Tagger
              </p>
              <span
                style={{
                  padding: '0.375rem 1rem',
                  background: '#22223a',
                  border: '1px solid #2e2e4a',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  color: '#f59e0b',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                🚧 Initial Project Setup
              </span>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
