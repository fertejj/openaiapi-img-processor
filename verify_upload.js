import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/process-image';

// A small 1x1 transparent PNG base64
const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const testUpload = async () => {
    try {
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
        console.log('Response:', data);

        if (response.status === 200 && data.message === 'Image processed successfully') {
            console.log('SUCCESS: Image upload verified.');
        } else {
            console.error('FAILURE: Image upload failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

testUpload();
