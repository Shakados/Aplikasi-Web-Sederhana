document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const temperatureInput = parseFloat(document.getElementById('temperature').value);
    const conversionType = document.querySelector('input[name="conversion"]:checked').value;
    const resultDiv = document.getElementById('result');
    const errorMsgDiv = document.getElementById('error-msg');
    const iconDiv = document.getElementById('icon');

    // Validasi input
    if (isNaN(temperatureInput)) {
        errorMsgDiv.textContent = 'Masukkan harus berupa angka.';
        resultDiv.textContent = '';
        iconDiv.innerHTML = ''; // Kosongkan ikon jika input tidak valid
    } else {
        errorMsgDiv.textContent = '';

        // Konversi suhu
        let convertedTemperature;
        if (conversionType === 'toFahrenheit') {
            convertedTemperature = (temperatureInput * 9/5) + 32;
            resultDiv.textContent = `${temperatureInput} Celsius = ${convertedTemperature.toFixed(2)} Fahrenheit`;
            iconDiv.innerHTML = '<img src="asset/thermometer.jpg" alt="Thermometer icon">'; // Tampilkan ikon thermometer
        } else {
            convertedTemperature = (temperatureInput - 32) * 5/9;
            resultDiv.textContent = `${temperatureInput} Fahrenheit = ${convertedTemperature.toFixed(2)} Celsius`;
            iconDiv.innerHTML = '<img src="asset/hot.png" alt="Hot icon">'; // Tampilkan ikon panas
        }

        // Simpan riwayat konversi ke local storage
        const conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
        conversionHistory.push({
            temperature: temperatureInput,
            type: conversionType === 'toFahrenheit' ? 'Celsius to Fahrenheit' : 'Fahrenheit to Celsius',
            result: convertedTemperature.toFixed(2),
            timestamp: new Date().toLocaleString()
        });
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    }
});
