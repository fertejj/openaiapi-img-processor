import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/process-image';

// Create a larger dummy base64 string (approx 200KB)
const largeBase64 = 'a'.repeat(200 * 1024);
const base64Image = `data:image/png;base64,${largeBase64}`;

const testUpload = async () => {
    try {
        console.log(`Sending payload of size: ${base64Image.length} bytes`);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: base64Image
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        // We expect a 500 or 400 because it's not a real image, but NOT a 413 Payload Too Large
        // Or if the AI service tries to process it, it might fail there.
        // The important thing is to pass the middleware.
        console.log('Response:', data);

        if (response.status !== 413) {
            console.log('SUCCESS: Payload size accepted (not 413).');
        } else {
            console.error('FAILURE: Still getting 413 Payload Too Large.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

testUpload();
