import { useState } from 'react';
import type { AISettings, AIProvider } from '../types';
import { GOOGLE_MODELS, CEREBRAS_MODELS, MISTRAL_MODELS } from '../types';

interface SettingsModalProps {
    settings: AISettings;
    onSave: (settings: AISettings) => void;
    onClose: () => void;
}

export function SettingsModal({ settings, onSave, onClose }: SettingsModalProps) {
    const [localSettings, setLocalSettings] = useState<AISettings>(settings);
    const [activeTab, setActiveTab] = useState<AIProvider>(settings.provider);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(localSettings);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>AI Settings</h2>
                        <p style={{ fontSize: '0.75rem', color: '#5a5f7a', marginTop: '0.25rem' }}>
                            Configure your preferred AI providers and models
                        </p>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-scroll-area" style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem' }}>
                        {/* User Name (for PDF naming) */}
                        <div className="form-group user-name-group" style={{ marginTop: '1.25rem' }}>
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={localSettings.userName}
                                onChange={(e) =>
                                    setLocalSettings({ ...localSettings, userName: e.target.value })
                                }
                                placeholder="Enter your full name"
                            />
                            <span className="hint">Used for naming exported PDF files</span>
                        </div>

                        {/* Provider Tabs */}
                        <div className="provider-tabs">
                            <button
                                type="button"
                                className={`tab ${activeTab === 'google' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('google');
                                    setLocalSettings({ ...localSettings, provider: 'google' });
                                }}
                            >
                                <svg className="tab-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.90 3.22-2.12 4.41-1.28 1.28-3.04 2.12-5.72 2.12-4.14 0-7.44-3.32-7.44-7.44s3.3-7.44 7.44-7.44c2.24 0 3.96.88 5.16 2.04l2.12-2.12c-1.84-2.04-4.24-3.2-7.28-3.2-5.78 0-10.5 4.72-10.5 10.5s4.72 10.5 10.5 10.5c3.12 0 5.48-1.04 7.32-2.92 1.88-1.88 2.48-4.52 2.48-6.68 0-.64-.04-1.28-.12-1.88z" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === 'cerebras' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('cerebras');
                                    setLocalSettings({ ...localSettings, provider: 'cerebras' });
                                }}
                            >
                                <svg className="tab-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                                Cerebras
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === 'mistral' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('mistral');
                                    setLocalSettings({ ...localSettings, provider: 'mistral' });
                                }}
                            >
                                <svg className="tab-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4M8 12h7" />
                                </svg>
                                Mistral
                            </button>
                        </div>

                        {/* Google Settings */}
                        {activeTab === 'google' && (
                            <div className="provider-settings">
                                <div className="form-group">
                                    <label>API Key</label>
                                    <input
                                        type="password"
                                        value={localSettings.googleApiKey}
                                        onChange={(e) =>
                                            setLocalSettings({ ...localSettings, googleApiKey: e.target.value })
                                        }
                                        placeholder="Enter your Google AI Studio API key"
                                    />
                                    <span className="hint">Get from: ai.google.dev</span>
                                </div>

                                <div className="form-group">
                                    <label>Model</label>
                                    <select
                                        value={localSettings.googleModel}
                                        onChange={(e) =>
                                            setLocalSettings({ ...localSettings, googleModel: e.target.value })
                                        }
                                    >
                                        {GOOGLE_MODELS.map((m) => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Cerebras Settings */}
                        {activeTab === 'cerebras' && (
                            <div className="provider-settings">
                                <div className="form-group">
                                    <label>API Key</label>
                                    <input
                                        type="password"
                                        value={localSettings.cerebrasApiKey}
                                        onChange={(e) =>
                                            setLocalSettings({ ...localSettings, cerebrasApiKey: e.target.value })
                                        }
                                        placeholder="Enter your Cerebras API key"
                                    />
                                    <span className="hint">Get from: cloud.cerebras.ai</span>
                                </div>

                                <div className="form-group">
                                    <label>Model</label>
                                    <select
                                        value={localSettings.cerebrasModel}
                                        onChange={(e) =>
                                            setLocalSettings({ ...localSettings, cerebrasModel: e.target.value })
                                        }
                                    >
                                        {CEREBRAS_MODELS.map((m) => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Mistral Settings */}
                        {activeTab === 'mistral' && (
                            <div className="provider-settings">
                                <div className="form-group">
                                    <label>API Key</label>
                                    <input
                                        type="password"
                                        value={localSettings.mistralApiKey}
                                        onChange={(e) =>
                                            setLocalSettings({ ...localSettings, mistralApiKey: e.target.value })
                                        }
                                        placeholder="Enter your Mistral API key"
                                    />
                                    <span className="hint">Get from: console.mistral.ai</span>
                                </div>

                                <div className="form-group">
                                    <label>Model</label>
                                    <select
                                        value={localSettings.mistralModel}
                                        onChange={(e) =>
                                            setLocalSettings({ ...localSettings, mistralModel: e.target.value })
                                        }
                                    >
                                        {MISTRAL_MODELS.map((m) => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
