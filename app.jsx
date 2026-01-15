const { useState, useEffect } = React;

const API_BASE_URL = 'http://localhost:5000/api';

const COLORS = {
    primary: '#0A2540',
    secondary: '#CFAE70',
    accent: '#E6E6FA',
    background: '#FAFAFA',
    text: '#1C1C1C'
};

// Navigation Component
function Navigation() {
    return (
        <nav style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0d3359 100%)`,
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(10, 37, 64, 0.2)'
        }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>
                ♀️ WomenWell AI
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
                <a href="#home" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Home</a>
                <a href="#predict" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Analyze</a>
            </div>
        </nav>
    );
}

// Hero Section
function Hero() {
    return (
        <div style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0d3359 100%)`,
            color: 'white',
            padding: '60px 32px',
            textAlign: 'center',
            borderRadius: '12px',
            marginBottom: '40px'
        }}>
            <h1 style={{ fontSize: '40px', marginBottom: '16px', fontWeight: 'bold' }}>
                Women's Wellbeing AI Monitor
            </h1>
            <p style={{
                fontSize: '18px',
                maxWidth: '700px',
                margin: '0 auto',
                opacity: '0.95',
                lineHeight: '1.6'
            }}>
                🤖 <strong>Fully Automated Intelligence</strong><br/>
                Monitor your activity, stress, energy & menstrual cycle with zero manual input.<br/>
                <em style={{ fontSize: '14px', opacity: '0.8' }}>AI-powered analysis from your daily sensors</em>
            </p>
        </div>
    );
}

// Input Form Component
function PredictionForm({ onSubmit, loading }) {
    const [mode, setMode] = useState('automated');
    const [formData, setFormData] = useState({
        steps: 2500,
        inactivity_hours: 7,
        screen_time: 6,
        night_usage: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, mode);
    };

    return (
        <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: `2px solid #E0E0E0`
        }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: COLORS.primary, textAlign: 'center' }}>
                🔍 Choose Analysis Mode
            </h2>

            {/* Mode Selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                <button
                    type="button"
                    onClick={() => setMode('automated')}
                    style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        background: mode === 'automated' ? COLORS.secondary : '#F0F0F0',
                        color: mode === 'automated' ? 'white' : '#666',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        transition: 'all 0.3s ease',
                        boxShadow: mode === 'automated' ? `0 4px 12px rgba(207, 174, 112, 0.3)` : 'none'
                    }}
                >
                    🤖 Fully Automated<br/><span style={{ fontSize: '12px', fontWeight: 'normal' }}>No input needed</span>
                </button>
                <button
                    type="button"
                    onClick={() => setMode('manual')}
                    style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        background: mode === 'manual' ? COLORS.secondary : '#F0F0F0',
                        color: mode === 'manual' ? 'white' : '#666',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        transition: 'all 0.3s ease',
                        boxShadow: mode === 'manual' ? `0 4px 12px rgba(207, 174, 112, 0.3)` : 'none'
                    }}
                >
                    ✏️ Manual Input<br/><span style={{ fontSize: '12px', fontWeight: 'normal' }}>Your metrics</span>
                </button>
            </div>

            {mode === 'manual' && (
                <>
                    <h3 style={{ fontSize: '16px', marginBottom: '16px', color: COLORS.primary, fontWeight: 'bold' }}>
                        📊 Your Daily Metrics
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '13px', color: COLORS.primary }}>
                                👟 Steps Today
                            </label>
                            <input
                                type="number"
                                name="steps"
                                value={formData.steps}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `2px solid #E0E0E0`,
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '13px', color: COLORS.primary }}>
                                🚫 Inactivity (hours)
                            </label>
                            <input
                                type="number"
                                name="inactivity_hours"
                                value={formData.inactivity_hours}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `2px solid #E0E0E0`,
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '13px', color: COLORS.primary }}>
                                📱 Screen Time (hours)
                            </label>
                            <input
                                type="number"
                                name="screen_time"
                                value={formData.screen_time}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `2px solid #E0E0E0`,
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '13px', color: COLORS.primary }}>
                                🌙 Night Usage (hours)
                            </label>
                            <input
                                type="number"
                                name="night_usage"
                                value={formData.night_usage}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: `2px solid #E0E0E0`,
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>
                </>
            )}

            {mode === 'automated' && (
                <div style={{
                    background: `linear-gradient(135deg, ${COLORS.accent} 0%, #f5f0ff 100%)`,
                    padding: '24px',
                    borderRadius: '10px',
                    marginBottom: '24px',
                    border: `2px dashed ${COLORS.secondary}`
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '12px' }}>
                        ✨ What We'll Analyze
                    </h3>
                    <ul style={{ fontSize: '13px', color: '#333', paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
                        <li>🏃 Activity & movement patterns</li>
                        <li>💤 Sleep quality & duration</li>
                        <li>📺 Screen & device usage</li>
                        <li>🩸 Menstrual cycle (28-day tracking)</li>
                        <li>⚡ Energy levels & stress indicators</li>
                    </ul>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                style={{
                    width: '100%',
                    background: loading ? '#ccc' : `linear-gradient(135deg, ${COLORS.primary} 0%, #0d3359 100%)`,
                    color: 'white',
                    padding: '16px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: loading ? 'none' : '0 4px 12px rgba(10, 37, 64, 0.3)'
                }}
            >
                {loading ? '⏳ Analyzing...' : `🔍 ${mode === 'automated' ? 'Start Automated' : 'Analyze'} Wellbeing`}
            </button>
        </form>
    );
}

// Results Component - Enhanced with Menstrual Cycle Analyzer
function Results({ data }) {
    if (!data) return null;

    const activity = data.activity || {};
    const stress = data.stress || {};
    const energy = data.energy || {};
    const menstrual = data.menstrual || {};
    const wellbeing = data.wellbeing || {};
    const recommendations = data.recommendations || {};

    const getMenstrualInfo = (phase) => {
        const info = {
            'Menstrual': { emoji: '🔴', color: '#d32f2f', tips: '💡 Rest well, stay hydrated, eat iron-rich foods, gentle exercise' },
            'Follicular': { emoji: '🟡', color: '#f57c00', tips: '💡 Energy increasing - great time for exercise and new activities' },
            'Ovulation': { emoji: '🟠', color: '#ff9800', tips: '💡 Peak energy! Best time for challenges, social activities, and intense workouts' },
            'Luteal': { emoji: '🟣', color: '#9c27b0', tips: '💡 Increase self-care, manage stress, prioritize sleep, focus on nutrition' }
        };
        return info[phase] || { emoji: '⚪', color: '#999', tips: '💡 Track your unique cycle patterns' };
    };

    const menstrualPhase = menstrual.phase || 'Unknown';
    const menstrualData = getMenstrualInfo(menstrualPhase);

    return (
        <div style={{ marginTop: '48px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '32px', color: COLORS.primary, textAlign: 'center', fontWeight: 'bold' }}>
                ✨ Your Personalized Analysis
            </h2>

            {/* Overall Score */}
            {wellbeing.score !== undefined && (
                <div style={{
                    background: `linear-gradient(135deg, ${COLORS.secondary} 0%, #d4a574 100%)`,
                    color: 'white',
                    padding: '40px 32px',
                    borderRadius: '16px',
                    marginBottom: '40px',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(207, 174, 112, 0.4)'
                }}>
                    <div style={{ fontSize: '16px', marginBottom: '16px', opacity: '0.95', fontWeight: '500' }}>Overall Wellbeing Score</div>
                    <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '12px' }}>
                        {Math.round(wellbeing.score)}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {wellbeing.icon} {wellbeing.status}
                    </div>
                    <div style={{ fontSize: '14px', opacity: '0.95' }}>
                        {wellbeing.description}
                    </div>
                </div>
            )}

            {/* Four Main Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '40px' }}>
                {activity.activity_level && (
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
                        border: `3px solid #FF6B6B`
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '8px' }}>Activity</h3>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF6B6B' }}>
                            {activity.activity_level}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                            Confidence: {activity.confidence || 0}%
                        </div>
                    </div>
                )}

                {stress.stress_level && (
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
                        border: `3px solid #FFA500`
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>😰</div>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '8px' }}>Stress</h3>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFA500' }}>
                            {stress.stress_level}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                            Score: {Math.round(stress.stress_score || 0)}/100
                        </div>
                    </div>
                )}

                {energy.energy_level !== undefined && (
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
                        border: `3px solid #4CAF50`
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '8px' }}>Energy</h3>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>
                            {Math.round(energy.energy_level)}/100
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                            {energy.energy_category || 'Stable'}
                        </div>
                    </div>
                )}

                {menstrual.phase && (
                    <div style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
                        border: `3px solid ${menstrualData.color}`
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>{menstrualData.emoji}</div>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '8px' }}>Period Phase</h3>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: menstrualData.color }}>
                            {menstrual.phase}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                            Day {menstrual.cycle_day || '?'}/28 • {menstrual.confidence || 0}% certain
                        </div>
                    </div>
                )}
            </div>

            {/* Menstrual Cycle Analyzer Section */}
            {menstrual.phase && (
                <div style={{
                    background: `linear-gradient(135deg, #FFE5F0 0%, #FFF0F8 100%)`,
                    padding: '32px',
                    borderRadius: '16px',
                    marginBottom: '40px',
                    border: `2px solid ${menstrualData.color}`,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '20px', textAlign: 'center' }}>
                        {menstrualData.emoji} Menstrual Cycle Intelligence
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>Current Phase</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: menstrualData.color }}>
                                {menstrual.phase}
                            </div>
                        </div>
                        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>Cycle Progress</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.primary }}>
                                {menstrual.cycle_day || '?'} / 28 days
                            </div>
                        </div>
                        <div style={{ background: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>Detection Confidence</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.secondary }}>
                                {menstrual.confidence || 0}%
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '8px' }}>
                            🎯 Personalized Tips for {menstrual.phase}
                        </div>
                        <div style={{ fontSize: '13px', color: '#333', lineHeight: '1.8' }}>
                            {menstrualData.tips}
                        </div>
                    </div>

                    {menstrual.expected_patterns && menstrual.expected_patterns.recommendation && (
                        <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '8px' }}>
                                📈 Expected Changes
                            </div>
                            <div style={{ fontSize: '13px', color: '#333', lineHeight: '1.8' }}>
                                {menstrual.expected_patterns.recommendation}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Recommendations */}
            {(recommendations.primary || recommendations.general) && (
                <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
                    border: `2px solid ${COLORS.secondary}`
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: COLORS.primary, marginBottom: '20px', textAlign: 'center' }}>
                        🎯 Personalized Wellness Recommendations
                    </h3>
                    
                    {recommendations.primary && recommendations.primary.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', marginBottom: '12px' }}>Priority Focus:</div>
                            {recommendations.primary.map((rec, idx) => (
                                <div key={idx} style={{ fontSize: '13px', color: '#333', marginBottom: '8px', paddingLeft: '20px' }}>
                                    ✓ {rec}
                                </div>
                            ))}
                        </div>
                    )}

                    {recommendations.general && recommendations.general.length > 0 && (
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', marginBottom: '12px' }}>Daily Wellness Practices:</div>
                            {recommendations.general.map((rec, idx) => (
                                <div key={idx} style={{ fontSize: '13px', color: '#333', marginBottom: '8px', paddingLeft: '20px' }}>
                                    • {rec}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Main App Component
function App() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePredict = async (formData, mode) => {
        setLoading(true);
        setError(null);

        try {
            let endpoint = mode === 'automated' ? '/analyze/automated' : '/analyze/manual';
            let options = {
                method: mode === 'automated' ? 'GET' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (mode === 'manual') {
                options.body = JSON.stringify(formData);
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('❌ Connection Error: Backend API not responding.\n\nMake sure Flask server is running:\n.venv\\Scripts\\python app.py');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: COLORS.background, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <Navigation />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
                <Hero />

                {error && (
                    <div style={{
                        background: '#f8d7da',
                        border: `2px solid #f5c6cb`,
                        color: '#721c24',
                        padding: '20px',
                        borderRadius: '10px',
                        marginBottom: '32px',
                        borderLeft: `5px solid #f8949a`,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {error}
                    </div>
                )}

                <section id="predict">
                    <PredictionForm onSubmit={handlePredict} loading={loading} />
                </section>

                {results && <Results data={results} />}
            </div>

            {/* Footer */}
            <footer style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0d3359 100%)`,
                color: 'white',
                textAlign: 'center',
                padding: '40px 20px',
                marginTop: '60px',
                fontSize: '13px'
            }}>
                <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                    Women's Wellbeing AI Monitor v2.0
                </p>
                <p style={{ opacity: '0.8', fontSize: '12px' }}>
                    Privacy-safe, fully automated system for women's health analytics
                </p>
                <p style={{ opacity: '0.6', fontSize: '11px', marginTop: '12px' }}>
                    🔐 No camera, no microphone, no personal data transmission
                </p>
            </footer>
        </div>
    );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
