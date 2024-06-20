// ContactForm.tsx
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('https://formspree.io/f/xvoevgge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    email: '',
                    message: '',
                });
            } else {
                throw new Error(
                    'An error occurred while submitting the form. Please try again.'
                );
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#f0f8ff',
                    textAlign: 'center',
                }}
            >
                Thank you for your submission!
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                width: '100%',
                margin: '0 auto',
                color: '#575757',
                fontWeight: '500',
            }}
        >
            <div style={{ marginBottom: '20px' }}>
                <label
                    htmlFor='email'
                    style={{ display: 'block', marginBottom: '5px' }}
                >
                    Email:
                </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '28px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label
                    htmlFor='message'
                    style={{ display: 'block', marginBottom: '5px' }}
                >
                    Message:
                </label>
                <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        height: '100px',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '28px',
                        resize: 'none',
                        transition: 'height 0.3s',
                        overflowY: 'hidden',
                    }}
                />
            </div>
            {error && (
                <div style={{ marginBottom: '20px', color: '#ff6b6b' }}>
                    Error: {error}
                </div>
            )}
            <button
                type='submit'
                disabled={submitting}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#B6CF54',
                    color: 'white',
                    border: 'none',
                    borderRadius: '26px',
                    cursor: 'pointer',
                }}
            >
                {submitting ? 'Sending...' : 'Submit'}
            </button>
        </form>
    );
};

export default ContactForm;
