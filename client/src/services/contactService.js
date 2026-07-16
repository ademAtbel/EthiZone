export const contactService = {
  async sendContactInquiry(inquiryData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit contact inquiry');
    }
    return result;
  }
};
