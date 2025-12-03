import crypto from 'crypto';
export const sendServerEvent = async (eventName, eventData = {}) => {
  try {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!pixelId || !accessToken)
      throw new Error('Pixel ID or Access Token missing from env');

    const url = `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventData.event_id || `${eventName}-${Date.now()}`,
          action_source: 'website',
          user_data: {
            client_ip_address: eventData.ip,
            client_user_agent: eventData.ua,
            em: eventData.email
              ? crypto
                  .createHash('sha256')
                  .update(eventData.email)
                  .digest('hex')
              : undefined,
            ph: eventData.phone
              ? crypto
                  .createHash('sha256')
                  .update(eventData.phone)
                  .digest('hex')
              : undefined,
          },
          custom_data: eventData.custom_data || {},
        },
      ],
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('SERVER SIDE EVENT SENT:', data);

    return data;
  } catch (err) {
    console.error('Meta Pixel Server Error:', err);
  }
};
