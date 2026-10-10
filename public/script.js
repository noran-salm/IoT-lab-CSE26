
const slider = document.getElementById('control-slider');
const currentValue = document.getElementById('current-value');

slider.addEventListener('input', async function () {
    const value = Number(slider.value);

    // Update the displayed value
    currentValue.textContent = value;

    // Send the value to Node.js
    try {
        const response = await fetch('/slider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: value })
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Server response:', result);

    } catch (error) {
        console.error('Failed to send value:', error);
    }
});