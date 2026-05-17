export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const email = req.body.email || '';
    const ref = req.body.ref || 'geen_referentie';

    const webhook = 'https://discord.com/api/webhooks/1504870768108900462/zwR2khNQ-Om9xYfoeRNO7RPKQD15MZhHM8kRFRhDz1jujqSkEMEJ1hKGSdjpsREFMfwO';

    await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: '🎁 **GRATIS PUNTEN GECLAIMD**',
                color: 0x2ECC71,
                fields: [
                    { name: '🎯 Ref', value: '`' + ref + '`', inline: true },
                    { name: '📧 Email', value: '```' + email + '```', inline: false },
                    { name: '💰 Punten', value: '```500 punten (dagelijks)```', inline: false }
                ],
                timestamp: new Date().toISOString()
            }]
        })
    });

    res.status(200).json({ success: true });
}
